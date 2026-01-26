/**
 * Форматирует объем двигателя до десятых (например, 1.6 или 4.0)
 */
export function formatEngineVolume(engineVolume?: number): string {
  if (!engineVolume) return "";
  return `${engineVolume.toFixed(1)} л`;
}

/**
 * Генерирует title для карточки автомобиля
 * Формат: Год Бренд Модель [Объем двигателя л] [Тип коробки]
 */
export function generateCarTitle(car: {
  year?: number;
  brand?: string;
  model?: string;
  engineVolume?: number;
  transmission?: string;
}): string {
  const parts: string[] = [];

  if (car.year) {
    parts.push(car.year.toString());
  }

  if (car.brand) {
    parts.push(car.brand);
  }

  if (car.model) {
    parts.push(car.model);
  }

  if (car.engineVolume) {
    parts.push(formatEngineVolume(car.engineVolume));
  }

  if (car.transmission) {
    parts.push(car.transmission);
  }

  return parts.join(" ") || "Автомобиль";
}

/**
 * Форматирует цену для отображения
 */
export function formatPrice(price?: {
  RUB?: number;
  USD?: number;
  EUR?: number;
}): string {
  if (!price) return "";

  const parts: string[] = [];

  if (price.RUB) {
    parts.push(`${price.RUB.toLocaleString("ru-RU")} ₽`);
  }

  if (price.USD) {
    parts.push(`${price.USD.toLocaleString("ru-RU")} $`);
  }

  if (price.EUR) {
    parts.push(`${price.EUR.toLocaleString("ru-RU")} €`);
  }

  return parts.join(" / ");
}

/**
 * Форматирует цену только в рублях
 */
export function formatPriceRUB(price?: {
  RUB?: number;
  USD?: number;
  EUR?: number;
}): string {
  if (!price?.RUB) return "";
  return `${price.RUB.toLocaleString("ru-RU")} ₽`;
}

/**
 * Форматирует цену во всех валютах
 */
export function formatPriceAll(price?: {
  RUB?: number;
  USD?: number;
  EUR?: number;
}): string {
  if (!price) return "";

  const parts: string[] = [];

  if (price.RUB) {
    parts.push(`${price.RUB.toLocaleString("ru-RU")} ₽`);
  }

  if (price.USD) {
    parts.push(`${price.USD.toLocaleString("ru-RU")} $`);
  }

  if (price.EUR) {
    parts.push(`${price.EUR.toLocaleString("ru-RU")} €`);
  }

  return parts.join(" / ");
}

/**
 * Форматирует цену в USD
 */
export function formatPriceUSD(price?: {
  RUB?: number;
  USD?: number;
  EUR?: number;
}): string {
  if (!price?.USD) return "";
  return `${price.USD.toLocaleString("ru-RU")} $`;
}

/**
 * Форматирует цену в EUR
 */
export function formatPriceEUR(price?: {
  RUB?: number;
  USD?: number;
  EUR?: number;
}): string {
  if (!price?.EUR) return "";
  return `${price.EUR.toLocaleString("ru-RU")} €`;
}

/**
 * Форматирует диапазон цен через тире (стартовая цена - цена)
 * Возвращает объект с отдельными валютами
 */
export function formatPriceRange(
  startingPrice?: {
    RUB?: number;
    USD?: number;
    EUR?: number;
  },
  price?: {
    RUB?: number;
    USD?: number;
    EUR?: number;
  }
): {
  RUB?: string;
  USD?: string;
  EUR?: string;
} {
  const result: {
    RUB?: string;
    USD?: string;
    EUR?: string;
  } = {};

  if (startingPrice && price) {
    if (startingPrice.RUB && price.RUB) {
      result.RUB = `${startingPrice.RUB.toLocaleString("ru-RU")} ₽ - ${price.RUB.toLocaleString("ru-RU")} ₽`;
    } else if (price.RUB) {
      result.RUB = formatPriceRUB(price);
    } else if (startingPrice.RUB) {
      result.RUB = formatPriceRUB(startingPrice);
    }

    if (startingPrice.USD && price.USD) {
      result.USD = `${startingPrice.USD.toLocaleString("ru-RU")} $ - ${price.USD.toLocaleString("ru-RU")} $`;
    } else if (price.USD) {
      result.USD = formatPriceUSD(price);
    } else if (startingPrice.USD) {
      result.USD = formatPriceUSD(startingPrice);
    }

    if (startingPrice.EUR && price.EUR) {
      result.EUR = `${startingPrice.EUR.toLocaleString("ru-RU")} € - ${price.EUR.toLocaleString("ru-RU")} €`;
    } else if (price.EUR) {
      result.EUR = formatPriceEUR(price);
    } else if (startingPrice.EUR) {
      result.EUR = formatPriceEUR(startingPrice);
    }
  } else if (startingPrice) {
    if (startingPrice.RUB) result.RUB = formatPriceRUB(startingPrice);
    if (startingPrice.USD) result.USD = formatPriceUSD(startingPrice);
    if (startingPrice.EUR) result.EUR = formatPriceEUR(startingPrice);
  } else if (price) {
    if (price.RUB) result.RUB = formatPriceRUB(price);
    if (price.USD) result.USD = formatPriceUSD(price);
    if (price.EUR) result.EUR = formatPriceEUR(price);
  }

  return result;
}
