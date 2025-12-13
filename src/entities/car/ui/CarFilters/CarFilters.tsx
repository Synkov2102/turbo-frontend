"use client";

import { FC, useState } from "react";
import { Button } from "@mui/material";
import styles from "./CarFilters.module.css";
import { GetCarsFilters } from "../../api/get-cars";
import { CarFiltersDrawer } from "../CarFiltersDrawer/CarFiltersDrawer";
import { ActiveFiltersTags } from "./components/ActiveFiltersTags";
import SearchIcon from "@mui/icons-material/Search";

interface CarFiltersProps {
  filters: GetCarsFilters;
  onFiltersChange: (filters: GetCarsFilters) => void;
  onFiltersReset: () => void;
}

export const CarFilters: FC<CarFiltersProps> = ({
  filters,
  onFiltersChange,
  onFiltersReset,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleRemoveFilter = (key: keyof GetCarsFilters) => {
    const newFilters = { ...filters };

    if (key === "minYear" || key === "maxYear") {
      delete newFilters.minYear;
      delete newFilters.maxYear;
    } else if (key === "minPrice" || key === "maxPrice") {
      delete newFilters.minPrice;
      delete newFilters.maxPrice;
    } else if (key === "minEngineVolume" || key === "maxEngineVolume") {
      delete newFilters.minEngineVolume;
      delete newFilters.maxEngineVolume;
    } else {
      delete newFilters[key];
    }

    onFiltersChange(newFilters);
  };

  return (
    <>
      <div className={styles.filters}>
        <Button
          startIcon={<SearchIcon />}
          variant="contained"
          className={styles.title}
          onClick={() => setIsDrawerOpen((prev) => !prev)}
        >
          Фильтры
        </Button>
        <ActiveFiltersTags
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
        />
      </div>

      {isDrawerOpen && (
        <CarFiltersDrawer
          filters={filters}
          onFiltersChange={onFiltersChange}
          onFiltersReset={onFiltersReset}
          open={isDrawerOpen}
          onClose={closeDrawer}
        />
      )}
    </>
  );
};
