// Общая часть для всех вариантов машины
interface CarBase {
  title: string;
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  city?: string;
  transmission?: string;
  engineVolume?: number;
  description?: string;
  url: string;
  images?: string[];
  createdAt?: string; // строка с датой
}

// features/car/model/types.ts
export interface FilterOptions {
  brands: string[];
  cities: string[];
  transmissions: string[];
  models: string[];
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  minEngineVolume: number;
  maxEngineVolume: number;
}

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

export interface Car extends CarBase {
  id: string; // на фронте у нас всегда есть нормальный id
}

export interface RawCar extends CarBase {
  _id: string; // из Mongo
}

export function mapCar(raw: RawCar): Car {
  return {
    id: raw._id,
    ...raw,
  };
}
