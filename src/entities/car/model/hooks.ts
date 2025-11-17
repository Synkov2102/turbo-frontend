"use client";

import { Car } from "./types";
import { GetCarsFilters, getCars } from "../api/get-cars";
import { getCarById } from "../api/get-car-by-id";
import { queryKeys, useAppQuery } from "@/shared/api/react-query";

export function useCars(filters: GetCarsFilters = {}) {
  return useAppQuery<Car[]>({
    queryKey: queryKeys.car.list(filters),
    queryFn: () => getCars(filters),
  });
}

export function useCar(id: string) {
  return useAppQuery<Car>({
    queryKey: queryKeys.car.one(id),
    queryFn: () => getCarById(id),
    enabled: !!id,
  });
}
