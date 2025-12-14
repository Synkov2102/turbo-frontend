import { FC } from "react";
import { Chip, Box } from "@mui/material";
import { GetCarsFilters } from "@/entities/car/model/types";
import styles from "./ActiveFiltersTags.module.css";

interface ActiveFiltersTagsProps {
  filters: GetCarsFilters;
  onRemoveFilter: (key: keyof GetCarsFilters) => void;
}

export const ActiveFiltersTags: FC<ActiveFiltersTagsProps> = ({
  filters,
  onRemoveFilter,
}) => {
  const activeFilters: Array<{ key: keyof GetCarsFilters; label: string }> = [];

  if (filters.brand) {
    activeFilters.push({ key: "brand", label: `Марка: ${filters.brand}` });
  }

  if (filters.model) {
    activeFilters.push({ key: "model", label: `Модель: ${filters.model}` });
  }

  if (filters.minYear || filters.maxYear) {
    if (filters.minYear && filters.maxYear) {
      activeFilters.push({
        key: "minYear",
        label: `Год: ${filters.minYear} - ${filters.maxYear}`,
      });
    } else if (filters.minYear) {
      activeFilters.push({
        key: "minYear",
        label: `Год от: ${filters.minYear}`,
      });
    } else if (filters.maxYear) {
      activeFilters.push({
        key: "maxYear",
        label: `Год до: ${filters.maxYear}`,
      });
    }
  }

  if (filters.minPrice || filters.maxPrice) {
    if (filters.minPrice && filters.maxPrice) {
      activeFilters.push({
        key: "minPrice",
        label: `Цена: ${filters.minPrice.toLocaleString(
          "ru-RU"
        )} - ${filters.maxPrice.toLocaleString("ru-RU")} ₽`,
      });
    } else if (filters.minPrice) {
      activeFilters.push({
        key: "minPrice",
        label: `Цена от: ${filters.minPrice.toLocaleString("ru-RU")} ₽`,
      });
    } else if (filters.maxPrice) {
      activeFilters.push({
        key: "maxPrice",
        label: `Цена до: ${filters.maxPrice.toLocaleString("ru-RU")} ₽`,
      });
    }
  }

  if (filters.city) {
    activeFilters.push({ key: "city", label: `Город: ${filters.city}` });
  }

  if (filters.transmission) {
    activeFilters.push({
      key: "transmission",
      label: `КПП: ${filters.transmission}`,
    });
  }

  if (filters.minEngineVolume || filters.maxEngineVolume) {
    if (filters.minEngineVolume && filters.maxEngineVolume) {
      activeFilters.push({
        key: "minEngineVolume",
        label: `Объем: ${filters.minEngineVolume} - ${filters.maxEngineVolume} л`,
      });
    } else if (filters.minEngineVolume) {
      activeFilters.push({
        key: "minEngineVolume",
        label: `Объем от: ${filters.minEngineVolume} л`,
      });
    } else if (filters.maxEngineVolume) {
      activeFilters.push({
        key: "maxEngineVolume",
        label: `Объем до: ${filters.maxEngineVolume} л`,
      });
    }
  }

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemove = (key: keyof GetCarsFilters) => {
    onRemoveFilter(key);
  };

  return (
    <Box className={styles.tags}>
      {activeFilters.map((filter) => (
        <Chip
          key={filter.key}
          label={filter.label}
          onDelete={() => handleRemove(filter.key)}
          size="small"
          variant="outlined"
          className={styles.tag}
        />
      ))}
    </Box>
  );
};
