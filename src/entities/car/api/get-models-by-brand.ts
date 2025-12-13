import { fetchJson } from "@/shared/api/http";

export async function getModelsByBrand(
  brand: string | undefined
): Promise<string[]> {
  if (!brand) {
    return [];
  }

  const params = new URLSearchParams();
  params.append("brand", brand);

  return fetchJson<string[]>(`/cars/filters/models?${params.toString()}`);
}
