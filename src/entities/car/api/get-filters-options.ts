import { fetchJson } from "@/shared/api/http";
import { FilterOptions } from "../model/types";

export async function getFilterOptions(): Promise<FilterOptions> {
  return fetchJson<FilterOptions>("/cars/filters/options");
}
