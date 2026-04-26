import { FC } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Box,
} from "@mui/material";
import styles from "@/entities/car/ui/CarFilters/components/shared/FilterField.module.css";
import { GetCarsFilters, FilterOptions } from "@/entities/car/model/types";
import { getCountryFlag } from "@/entities/car/lib/country-flag";
import { TwemojiText } from "@/shared/ui/twemoji";

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
  const groupedByCountry = filterOptions.cities.reduce<Record<string, string[]>>(
    (acc, item) => {
      const country = item.country || "Другое";
      acc[country] ??= [];
      acc[country].push(item.city);
      return acc;
    },
    {}
  );

  const countries = Object.keys(groupedByCountry).sort((a, b) =>
    a.localeCompare(b, "ru")
  );

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
          onChange={(e) => {
            const value = String(e.target.value || "");
            if (!value) {
              onFilterChange("city", undefined);
              onFilterChange("country", undefined);
              return;
            }

            const found = filterOptions.cities.find((x) => x.city === value);
            onFilterChange("city", value);
            onFilterChange("country", found?.country);
          }}
        >
          <MenuItem value="">Все города</MenuItem>
          {countries.flatMap((country) => {
            const cities = groupedByCountry[country] ?? [];
            const flag = getCountryFlag(country);

            return [
              <ListSubheader key={`h-${country}`} disableSticky>
                <TwemojiText as="span">{`${flag ? `${flag} ` : ""}${country}`}</TwemojiText>
              </ListSubheader>,
              ...cities
                .slice()
                .sort((a, b) => a.localeCompare(b, "ru"))
                .map((city) => (
                  <MenuItem key={`${country}-${city}`} value={city}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: 0,
                      }}
                    >
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        {city}
                      </span>
                    </Box>
                  </MenuItem>
                )),
            ];
          })}
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
