import { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "@/entities/car/ui/CarFilters/components/shared/FilterField.module.css";
import { GetCarsFilters, FilterOptions } from "@/entities/car/model/types";
import { useModelsByBrand } from "@/entities/car/model/hooks";

interface BrandModelFiltersProps {
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  filters: GetCarsFilters;
  onFilterChange: (
    key: keyof GetCarsFilters,
    value: string | number | undefined
  ) => void;
  filterOptions: FilterOptions;
}

export const BrandModelFilters: FC<BrandModelFiltersProps> = ({
  selectedBrand,
  onBrandChange,
  filters,
  onFilterChange,
  filterOptions,
}) => {
  const { data: models, isLoading: modelsLoading } = useModelsByBrand(
    selectedBrand || undefined
  );

  return (
    <div className={styles.filterRow}>
      <FormControl fullWidth size="small" className={styles.filterItem}>
        <InputLabel>Бренд</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          value={selectedBrand}
          label="Бренд"
          onChange={(e) => onBrandChange(e.target.value)}
        >
          <MenuItem value="">Все бренды</MenuItem>
          {filterOptions.brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        size="small"
        className={styles.filterItem}
        disabled={!selectedBrand}
      >
        <InputLabel>Модель</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          value={filters.model || ""}
          label="Модель"
          onChange={(e) => onFilterChange("model", e.target.value)}
        >
          <MenuItem value="">Все модели</MenuItem>
          {modelsLoading ? (
            <MenuItem disabled>Загрузка...</MenuItem>
          ) : (
            models?.map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};
