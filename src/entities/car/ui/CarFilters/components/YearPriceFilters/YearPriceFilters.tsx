import { FC } from "react";
import { TextField, Typography } from "@mui/material";
import styles from "../shared/FilterField.module.css";
import { GetCarsFilters, FilterOptions } from "../../../../model/types";

interface YearPriceFiltersProps {
  filters: GetCarsFilters;
  onFilterChange: (
    key: keyof GetCarsFilters,
    value: string | number | undefined
  ) => void;
  filterOptions: FilterOptions;
}

export const YearPriceFilters: FC<YearPriceFiltersProps> = ({
  filters,
  onFilterChange,
  filterOptions,
}) => {
  return (
    <div className={styles.filterRow}>
      <TextField
        fullWidth
        size="small"
        type="number"
        label="Год от"
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
        fullWidth
        size="small"
        type="number"
        label="Год до"
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

      <TextField
        fullWidth
        size="small"
        type="number"
        label="Цена от"
        className={styles.filterItem}
        value={filters.minPrice || ""}
        onChange={(e) =>
          onFilterChange(
            "minPrice",
            e.target.value ? Number(e.target.value) : undefined
          )
        }
        InputProps={{
          endAdornment: <Typography variant="caption">₽</Typography>,
        }}
      />

      <TextField
        fullWidth
        size="small"
        type="number"
        label="Цена до"
        className={styles.filterItem}
        value={filters.maxPrice || ""}
        onChange={(e) =>
          onFilterChange(
            "maxPrice",
            e.target.value ? Number(e.target.value) : undefined
          )
        }
        InputProps={{
          endAdornment: <Typography variant="caption">₽</Typography>,
        }}
      />
    </div>
  );
};
