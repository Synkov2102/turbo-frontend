import { fetchJson } from "@/shared/api/http";
import { Car, RawCar, mapCar } from "../model/types";

/**
 * Получить одну машину по id.
 */
export async function getCarById(id: string): Promise<Car> {
  const result = await fetchJson<RawCar>(`/cars/${id}`);
  return mapCar(result);
}
