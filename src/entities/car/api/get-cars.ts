import { fetchJson } from "@/shared/api/http";
import { Car, mapCar, RawCar } from "../model/types";

export interface GetCarsFilters {
  brand?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  transmission?: string;
  minEngineVolume?: number;
  maxEngineVolume?: number;
}

/**
 * Получить список машин с фильтрами.
 * Маппинг query-параметров совпадает с твоим Nest-контроллером.
 */
export async function getCars(filters: GetCarsFilters = {}): Promise<Car[]> {
  const result = await fetchJson<RawCar[]>("/cars", {
    params: {
      brand: filters.brand,
      model: filters.model,
      minYear: filters.minYear,
      maxYear: filters.maxYear,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      city: filters.city,
      transmission: filters.transmission,
      minEngineVolume: filters.minEngineVolume,
      maxEngineVolume: filters.maxEngineVolume,
    },
  });

  return result.map(mapCar);
}
