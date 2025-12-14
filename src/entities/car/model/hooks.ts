"use client";

import { Car, FilterOptions, PaginatedResponse, GetCarsFilters } from "./types";
import { getCars } from "@/entities/car/api/get-cars";
import { getCarById } from "@/entities/car/api/get-car-by-id";
import { queryKeys, useAppQuery } from "@/shared/api/react-query";
import { getFilterOptions } from "@/entities/car/api/get-filters-options";
import { getModelsByBrand } from "@/entities/car/api/get-models-by-brand";

export function useCars(filters: GetCarsFilters = {}) {
  return useAppQuery<PaginatedResponse<Car>>({
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
/**
 * Хук для получения опций фильтров
 */
export function useFilterOptions() {
  return useAppQuery<FilterOptions>({
    queryKey: queryKeys.filters.options(),
    queryFn: () => getFilterOptions(),
    staleTime: 60 * 1000, // 1 минута`
  });
}

/**
 * Хук для получения моделей по бренду
 */
export function useModelsByBrand(brand: string | undefined) {
  return useAppQuery<string[]>({
    queryKey: queryKeys.filters.models(brand),
    queryFn: () => getModelsByBrand(brand),
    enabled: !!brand, // Запрос выполняется только если бренд указан
    staleTime: 60 * 1000,
  });
}
