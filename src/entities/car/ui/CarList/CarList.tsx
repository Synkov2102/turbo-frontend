"use client";

import { FC } from "react";

import styles from "./CarList.module.css";
import { CarCard } from "@/entities/car/ui/CarCard/CarCard";
import { GetCarsFilters } from "@/entities/car/model/types";
import { useCars } from "@/entities/car/model/hooks";
import { Pagination } from "@/shared/ui/pagination";

interface CarListProps {
  filters?: GetCarsFilters;
  page?: number;
  onPageChange?: (page: number) => void;
}

export const CarList: FC<CarListProps> = ({
  filters = {},
  page = 1,
  onPageChange,
}) => {
  const { data, isLoading, error } = useCars({ ...filters, page });

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

  if (!data || data.data.length === 0) {
    return <div className={styles.state}>Машины не найдены</div>;
  }

  const startItem = (data.meta.page - 1) * data.meta.limit + 1;
  const endItem = Math.min(data.meta.page * data.meta.limit, data.meta.total);

  return (
    <>
      {data.meta.total > 0 && (
        <div className={styles.info}>
          Показано {startItem}-{endItem} из {data.meta.total}
        </div>
      )}
      <div className={styles.grid}>
        {data.data.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      {onPageChange && (
        <Pagination
          page={page}
          totalPages={data.meta.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
