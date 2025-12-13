"use client";

import { CarList } from "@/entities/car/ui/CarList/CarList";
import styles from "./page.module.css";
import { GetCarsFilters } from "@/entities/car/model/types";
import { useState } from "react";
import { CarFilters } from "@/entities/car/ui/CarFilters";

export default function HomePage() {
  const [filters, setFilters] = useState<GetCarsFilters>({});

  const handleFiltersChange = (newFilters: GetCarsFilters) => {
    setFilters(newFilters);
  };

  const handleFiltersReset = () => {
    setFilters({});
  };
  return (
    <>
      <section className={styles.header}>
        <h1 className={styles.title}>Каталог автомобилей</h1>
      </section>

      <CarFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onFiltersReset={handleFiltersReset}
      />
      <section>
        <CarList filters={filters} />
      </section>
    </>
  );
}
