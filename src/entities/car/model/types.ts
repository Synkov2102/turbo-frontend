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
