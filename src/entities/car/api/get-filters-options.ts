import { fetchJson } from "@/shared/api/http";
import { FilterOptions } from "@/entities/car/model/types";

export async function getFilterOptions(): Promise<FilterOptions> {
  return fetchJson<FilterOptions>("/cars/filters/options");
}
