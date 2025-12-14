import { FC, useCallback } from "react";
import { TextField, Typography, Slider, Box } from "@mui/material";
import styles from "./YearPriceFilters.module.css";
import { GetCarsFilters, FilterOptions } from "@/entities/car/model/types";

interface YearPriceFiltersProps {
  filters: GetCarsFilters;
  onFilterChange: (
    key: keyof GetCarsFilters,
    value: string | number | undefined
  ) => void;
  filterOptions: FilterOptions;
}

const formatNumber = (value: number | undefined): string => {
  if (value === undefined || value === null) return "";
  return value.toLocaleString("ru-RU");
};

const parseNumber = (value: string): number | undefined => {
  const cleaned = value.replace(/\s/g, "").replace(/\u00A0/g, "");
  if (!cleaned) return undefined;
  const num = Number(cleaned);
  return isNaN(num) ? undefined : num;
};

export const YearPriceFilters: FC<YearPriceFiltersProps> = ({
  filters,
  onFilterChange,
  filterOptions,
}) => {
  const minYear = filters.minYear ?? filterOptions.minYear;
  const maxYear = filters.maxYear ?? filterOptions.maxYear;
  const minPrice = filters.minPrice ?? filterOptions.minPrice;
  const maxPrice = filters.maxPrice ?? filterOptions.maxPrice;

  const handleYearChange = useCallback(
    (_: unknown, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        onFilterChange("minYear", newValue[0]);
        onFilterChange("maxYear", newValue[1]);
      }
    },
    [onFilterChange]
  );

  const handlePriceChange = useCallback(
    (_: unknown, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        onFilterChange("minPrice", newValue[0]);
        onFilterChange("maxPrice", newValue[1]);
      }
    },
    [onFilterChange]
  );

  return (
    <div className={styles.filterRow}>
      <Box className={styles.filterGroup}>
        <Typography variant="body2" className={styles.label}>
          Год выпуска
        </Typography>
        <div className={styles.inputsRow}>
          <TextField
            size="small"
            type="number"
            label="От"
            className={styles.filterItem}
            value={filters.minYear || ""}
            onChange={(e) =>
              onFilterChange(
                "minYear",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            inputProps={{
              min: filterOptions.minYear,
              max: filterOptions.maxYear,
            }}
          />
          <TextField
            size="small"
            type="number"
            label="До"
            className={styles.filterItem}
            value={filters.maxYear || ""}
            onChange={(e) =>
              onFilterChange(
                "maxYear",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            inputProps={{
              min: filterOptions.minYear,
              max: filterOptions.maxYear,
            }}
          />
        </div>
        <Box className={styles.sliderContainer}>
          <Slider
            value={[minYear, maxYear]}
            onChange={handleYearChange}
            min={filterOptions.minYear}
            max={filterOptions.maxYear}
            valueLabelDisplay="auto"
            className={styles.slider}
          />
        </Box>
      </Box>

      <Box className={styles.filterGroup}>
        <Typography variant="body2" className={styles.label}>
          Цена
        </Typography>
        <div className={styles.inputsRow}>
          <TextField
            size="small"
            type="text"
            label="От"
            className={styles.filterItem}
            value={formatNumber(filters.minPrice)}
            onChange={(e) => {
              const parsed = parseNumber(e.target.value);
              onFilterChange("minPrice", parsed);
            }}
            InputProps={{
              endAdornment: <Typography variant="caption">₽</Typography>,
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9\\s]*",
            }}
          />
          <TextField
            size="small"
            type="text"
            label="До"
            className={styles.filterItem}
            value={formatNumber(filters.maxPrice)}
            onChange={(e) => {
              const parsed = parseNumber(e.target.value);
              onFilterChange("maxPrice", parsed);
            }}
            InputProps={{
              endAdornment: <Typography variant="caption">₽</Typography>,
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9\\s]*",
            }}
          />
        </div>
        <Box className={styles.sliderContainer}>
          <Slider
            value={[minPrice, maxPrice]}
            onChange={handlePriceChange}
            min={filterOptions.minPrice}
            max={filterOptions.maxPrice}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toLocaleString("ru-RU")} ₽`}
            className={styles.slider}
          />
        </Box>
      </Box>
    </div>
  );
};
