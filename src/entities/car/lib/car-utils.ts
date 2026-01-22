import { Car } from "../model/types";

/**
 * Форматирует тип трансмиссии в читаемый вид
 */
export function formatTransmission(transmission?: string): string {
  if (!transmission) return "";

  const transmissionMap: Record<string, string> = {
    AT: "АКПП",
    MT: "МКПП",
    AMT: "АМТ",
    CVT: "Вариатор",
  };

  return transmissionMap[transmission] || transmission;
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
    parts.push(`${formatEngineVolume(car.engineVolume)} л`);
  }

  if (car.transmission) {
    parts.push(formatTransmission(car.transmission));
  }

  return parts.join(" ") || "Автомобиль";
}

/**
 * Округляет объём двигателя до десятых (1 знак после запятой).
 */
export function formatEngineVolume(value: number): string {
  // toFixed даст строку с точкой; в RU-интерфейсе заменяем на запятую
  const rounded = (Math.round(value * 10) / 10).toFixed(1);
  return rounded.replace(".", ",");
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
 * Возвращает emoji-флаг по названию / коду страны.
 * Поддерживает основные страны, остальные возвращают пустую строку.
 */
export function getCountryFlag(country?: string): string {
  if (!country) return "";

  const normalized = country.trim().toLowerCase();

  const map: Record<string, string> = {
    // Россия
    ru: "🇷🇺",
    "russia": "🇷🇺",
    "россия": "🇷🇺",
    // США
    us: "🇺🇸",
    "usa": "🇺🇸",
    "united states": "🇺🇸",
    "united states of america": "🇺🇸",
    // Великобритания
    gb: "🇬🇧",
    "uk": "🇬🇧",
    "united kingdom": "🇬🇧",
    "great britain": "🇬🇧",
    // Германия
    de: "🇩🇪",
    "germany": "🇩🇪",
    "deutschland": "🇩🇪",
    // Франция
    fr: "🇫🇷",
    "france": "🇫🇷",
    // Италия
    it: "🇮🇹",
    "italy": "🇮🇹",
    // Испания
    es: "🇪🇸",
    "spain": "🇪🇸",
    "españa": "🇪🇸",
    // Швейцария
    ch: "🇨🇭",
    "switzerland": "🇨🇭",
    // Нидерланды
    nl: "🇳🇱",
    "netherlands": "🇳🇱",
    "holland": "🇳🇱",
    // ОАЭ
    ae: "🇦🇪",
    "uae": "🇦🇪",
    "united arab emirates": "🇦🇪",
    // Япония
    jp: "🇯🇵",
    "japan": "🇯🇵",
    // Китай
    cn: "🇨🇳",
    "china": "🇨🇳",
    // Бельгия
    be: "🇧🇪",
    "belgium": "🇧🇪",
    "бельгия": "🇧🇪",
  };

  return map[normalized] ?? "";
}
