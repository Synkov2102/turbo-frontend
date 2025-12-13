import { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "../shared/FilterField.module.css";
import { GetCarsFilters, FilterOptions } from "../../../../model/types";

interface LocationTransmissionFiltersProps {
  filters: GetCarsFilters;
  onFilterChange: (
    key: keyof GetCarsFilters,
    value: string | number | undefined
  ) => void;
  filterOptions: FilterOptions;
}

export const LocationTransmissionFilters: FC<
  LocationTransmissionFiltersProps
> = ({ filters, onFilterChange, filterOptions }) => {
  return (
    <div className={styles.filterRow}>
      <FormControl fullWidth size="small" className={styles.filterItem}>
        <InputLabel>Город</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          value={filters.city || ""}
          label="Город"
          onChange={(e) => onFilterChange("city", e.target.value)}
        >
          <MenuItem value="">Все города</MenuItem>
          {filterOptions.cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" className={styles.filterItem}>
        <InputLabel>Трансмиссия</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          value={filters.transmission || ""}
          label="Трансмиссия"
          onChange={(e) => onFilterChange("transmission", e.target.value)}
        >
          <MenuItem value="">Все типы</MenuItem>
          {filterOptions.transmissions.map((transmission) => (
            <MenuItem key={transmission} value={transmission}>
              {transmission}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
