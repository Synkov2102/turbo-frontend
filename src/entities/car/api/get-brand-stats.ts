import { fetchJson } from "@/shared/api/http";

export interface BrandStat {
  brand: string;
  count: number;
}

interface BrandStatsResponse {
  brands: BrandStat[];
  total: number;
}

/**
 * Получить статистику по брендам.
 * Бэкенд уже возвращает отсортированный по убыванию список.
 */
export async function getBrandStats(): Promise<BrandStat[]> {
  const response = await fetchJson<BrandStatsResponse>("/cars/stats/brands");
  return response.brands;
}

