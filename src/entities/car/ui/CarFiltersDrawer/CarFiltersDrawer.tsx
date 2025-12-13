"use client";

import { FC, useState } from "react";
import { Drawer } from "@mui/material";
import { GetCarsFilters } from "../../api/get-cars";
import { useFilterOptions } from "../../model/hooks";
import { FilterHeader } from "../CarFilters/components/FilterHeader";
import { BrandModelFilters } from "../CarFilters/components/BrandModelFilters";
import { LocationTransmissionFilters } from "../CarFilters/components/LocationTransmissionFilters";
import { YearPriceFilters } from "../CarFilters/components/YearPriceFilters";
import { FilterActions } from "../CarFilters/components/FilterActions";
import { FilterLoadingState } from "../CarFilters/components/FilterLoadingState";
import { FilterErrorState } from "../CarFilters/components/FilterErrorState";
import styles from "./CarFiltersDrawer.module.css";

interface CarFiltersDrawerProps {
  filters: GetCarsFilters;
  onFiltersChange: (filters: GetCarsFilters) => void;
  onFiltersReset: () => void;
  open: boolean;
  onClose: () => void;
}

export const CarFiltersDrawer: FC<CarFiltersDrawerProps> = ({
  filters,
  onFiltersChange,
  onFiltersReset,
  open,
  onClose,
}) => {
  const { data: filterOptions, isLoading, error } = useFilterOptions();
  const [tempFilters, setTempFilters] = useState<GetCarsFilters>(filters);
  const [selectedBrand, setSelectedBrand] = useState<string>(
    filters.brand || ""
  );

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setTempFilters((prev) => ({
      ...prev,
      brand: brand || undefined,
      model: undefined,
    }));
  };

  const handleFilterChange = (
    key: keyof GetCarsFilters,
    value: string | number | undefined
  ) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  const handleReset = () => {
    setTempFilters({});
    setSelectedBrand("");
    onFiltersReset();
    onClose();
  };

  return (
    <Drawer open={open} variant="persistent" onClose={onClose}>
      {isLoading ? (
        <FilterLoadingState />
      ) : error ? (
        <FilterErrorState error={error} />
      ) : filterOptions ? (
        <div className={styles.filters}>
          <FilterHeader closeDrawer={onClose} />
          <BrandModelFilters
            selectedBrand={selectedBrand}
            onBrandChange={handleBrandChange}
            filters={tempFilters}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
          />

          <LocationTransmissionFilters
            filters={tempFilters}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
          />

          <YearPriceFilters
            filters={tempFilters}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
          />

          <FilterActions onReset={handleReset} onApply={handleApply} />
        </div>
      ) : null}
    </Drawer>
  );
};
