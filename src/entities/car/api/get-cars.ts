import { fetchJson } from "@/shared/api/http";
import { Car, mapCar, RawCar, PaginatedResponse, PaginationMeta, GetCarsFilters } from "@/entities/car/model/types";

interface RawPaginatedResponse {
  data: RawCar[];
  meta: PaginationMeta;
}

/**
 * Получить список машин с фильтрами и пагинацией.
 * Маппинг query-параметров совпадает с Nest-контроллером.
 */
export async function getCars(
  filters: GetCarsFilters = {}
): Promise<PaginatedResponse<Car>> {
  const result = await fetchJson<RawPaginatedResponse>("/cars", {
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
      page: filters.page,
      limit: filters.limit,
    },
  });

  return {
    data: result.data.map(mapCar),
    meta: result.meta,
  };
}
