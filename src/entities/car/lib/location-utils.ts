import { getCountryFlag } from "./country-flag";
import { Car } from "../model/types";

/**
 * Форматирует локацию (город и страна) с флагом для отображения
 */
export function formatLocationWithFlag(car: Car): string {
  const city = car.location?.city || car.city || "";
  const country = car.location?.country;
  
  if (!city && !country) {
    return "";
  }

  const parts: string[] = [];
  
  if (city) {
    parts.push(city);
  }
  
  if (country) {
    parts.push(country);
    const flag = getCountryFlag(country);
    if (flag) {
      parts.push(flag);
    }
  }

  return parts.join(", ");
}

/**
 * Получает город из данных автомобиля
 */
export function getCity(car: Car): string {
  return car.location?.city || car.city || "";
}

/**
 * Получает страну из данных автомобиля
 */
export function getCountry(car: Car): string | undefined {
  return car.location?.country;
}

/**
 * Форматирует локацию для отображения в TwemojiText компоненте
 */
export function formatLocationText(car: Car): string {
  const city = getCity(car);
  const country = getCountry(car);
  
  if (!city && !country) {
    return "";
  }

  const parts: string[] = [];
  
  if (city) {
    parts.push(city);
  }
  
  if (country) {
    parts.push(`, ${country}`);
    const flag = getCountryFlag(country);
    if (flag) {
      parts.push(` ${flag}`);
    }
  }

  return parts.join("");
}
