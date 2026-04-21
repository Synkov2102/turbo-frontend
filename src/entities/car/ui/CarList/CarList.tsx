"use client";

import React, { FC, useMemo, useState } from "react";
import { IconButton, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SortIcon from "@mui/icons-material/Sort";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  onFiltersChange?: (filters: GetCarsFilters) => void;
}

export const CarList: FC<CarListProps> = ({
  filters = {},
  page = 1,
  onPageChange,
  onFiltersChange,
}) => {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

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
  const sortValue: NonNullable<GetCarsFilters["sort"]> = filters.sort ?? "priceAsc";

  const sortLabelMap: Record<NonNullable<GetCarsFilters["sort"]>, string> = {
    priceAsc: "По возрастанию цены",
    priceDesc: "По убыванию цены",
    yearAsc: "По году: старше",
    yearDesc: "По году: новее",
  };

  const openSortMenu = (e: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(e.currentTarget);
  };

  const closeSortMenu = () => setSortAnchorEl(null);

  const applySort = (nextSort: NonNullable<GetCarsFilters["sort"]>) => {
    onFiltersChange?.({
      ...filters,
      sort: nextSort,
    });
    closeSortMenu();
  };

  return (
    <>
      {data.meta.total > 0 && (
        <div className={styles.info}>
          <span className={styles.infoText}>
            Показано {startItem}-{endItem} из {data.meta.total}
          </span>
          {onFiltersChange && (
            <>
              <button
                type="button"
                className={styles.sortButton}
                onClick={openSortMenu}
                aria-haspopup="menu"
                aria-expanded={Boolean(sortAnchorEl)}
              >
                <span className={styles.sortIcon} aria-hidden="true">
                  <SortIcon fontSize="small" />
                </span>
                <span className={styles.sortText}>
                  {sortLabelMap[sortValue]}
                  <span className={styles.sortChevron} aria-hidden="true">
                    <ExpandMoreIcon fontSize="small" />
                  </span>
                </span>
              </button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={closeSortMenu}
                disableScrollLock
                MenuListProps={{ dense: true }}
              >
                {(Object.keys(sortLabelMap) as Array<
                  NonNullable<GetCarsFilters["sort"]>
                >).map((key) => (
                  <MenuItem
                    key={key}
                    selected={key === sortValue}
                    onClick={() => applySort(key)}
                  >
                    {sortLabelMap[key]}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
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
