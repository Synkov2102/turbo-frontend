"use client";

import { FC } from "react";

import styles from "./CarList.module.css";
import { CarCard } from "../CarCard/CarCard";
import { GetCarsFilters } from "../../api/get-cars";
import { useCars } from "../../model/hooks";

interface CarListProps {
  filters?: GetCarsFilters;
}

export const CarList: FC<CarListProps> = ({ filters = {} }) => {
  const { data, isLoading, error } = useCars(filters);

  if (isLoading) {
    return <div className={styles.state}>Загрузка машин...</div>;
  }

  if (error) {
    return (
      <div className={styles.state}>
        Ошибка загрузки: {(error as Error).message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className={styles.state}>Машины не найдены</div>;
  }

  return (
    <div className={styles.grid}>
      {data.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
