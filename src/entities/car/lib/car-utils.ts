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
    parts.push(`${car.engineVolume} л`);
  }

  if (car.transmission) {
    parts.push(formatTransmission(car.transmission));
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
