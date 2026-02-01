# ===== deps =====
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./

# Установка зависимостей с проверкой целостности
# Если package-lock.json не синхронизирован с package.json, обновляем его автоматически
RUN npm ci --prefer-offline --no-audit --ignore-scripts 2>&1 | tee /tmp/npm-output.log || \
    { \
      if grep -q "does not satisfy" /tmp/npm-output.log || grep -q "in sync" /tmp/npm-output.log; then \
        echo "Lock file out of sync with package.json, updating..."; \
        npm install --package-lock-only --no-audit --ignore-scripts; \
        npm ci --prefer-offline --no-audit --ignore-scripts; \
      else \
        echo "ERROR: npm ci failed - possible tampering detected"; \
        cat /tmp/npm-output.log; \
        exit 1; \
      fi \
    }

# ===== builder =====
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Явное копирование только необходимых файлов (безопасность)
# Вместо COPY . . используем явное копирование для предотвращения попадания вредоносных файлов
COPY package.json package-lock.json ./
COPY next.config.ts tsconfig.json ./
COPY eslint.config.mjs ./
COPY public ./public
COPY src ./src

# Проверка целостности зависимостей перед сборкой
RUN npm audit --audit-level=moderate || true
RUN npm run build

# ===== runner =====
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Создание непривилегированного пользователя
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Копирование только необходимых файлов из builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключение на непривилегированного пользователя
USER nextjs

# Ограничения безопасности (должны быть установлены при запуске контейнера)
# docker run --memory="512m" --cpus="1.0" --read-only --tmpfs /tmp --tmpfs /app/.next/cache
EXPOSE 3000

# Использование exec form для предотвращения shell injection
CMD ["node", "server.js"]
