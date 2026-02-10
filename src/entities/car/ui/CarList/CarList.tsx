"use client";

import { FC, useMemo } from "react";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import styles from "./CarList.module.css";
import { CarCard } from "@/entities/car/ui/CarCard/CarCard";
import { CarCardSkeleton } from "@/entities/car/ui/CarCard/CarCardSkeleton";
import { GetCarsFilters } from "@/entities/car/model/types";
import { useCars } from "@/entities/car/model/hooks";
import { Pagination } from "@/shared/ui/pagination";
import { CarListError } from "./components/CarListError";

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
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("md"));

  const limit = useMemo(() => {
    return isWideScreen ? 16 : 10;
  }, [isWideScreen]);

  const { data, isLoading, error } = useCars({ ...filters, page, limit });

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: limit }).map((_, index) => (
          <CarCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <CarListError />;
  }

  if (!data || data.data.length === 0) {
    return <div className={styles.state}>Машины не найдены</div>;
  }

  const startItem = (data.meta.page - 1) * data.meta.limit + 1;
  const endItem = Math.min(data.meta.page * data.meta.limit, data.meta.total);
  const hasPrev = data.meta.page > 1;
  const hasNext = data.meta.page < data.meta.totalPages;

  return (
    <>
      {data.meta.total > 0 && (
        <div className={styles.info}>
          <span className={styles.infoText}>
            Показано {startItem}-{endItem} из {data.meta.total}
          </span>
          {onPageChange && data.meta.totalPages > 1 && (
            <div className={styles.infoPager}>
              <IconButton
                size="small"
                className={styles.infoPagerButton}
                disabled={!hasPrev}
                onClick={() => hasPrev && onPageChange(data.meta.page - 1)}
                aria-label="Предыдущая страница"
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <span className={styles.infoPagerPage}>{data.meta.page}</span>
              <IconButton
                size="small"
                className={styles.infoPagerButton}
                disabled={!hasNext}
                onClick={() => hasNext && onPageChange(data.meta.page + 1)}
                aria-label="Следующая страница"
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </div>
          )}
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
