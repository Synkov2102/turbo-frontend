"use client";

import { CarList } from "@/entities/car/ui/CarList/CarList";
import styles from "./page.module.css";
import { GetCarsFilters } from "@/entities/car/model/types";
import { useState } from "react";
import { CarFilters } from "@/entities/car/ui/CarFilters";
import { PostsBanner } from "@/entities/post/ui/PostsBanner";
import { PopularBrands } from "@/entities/car/ui/PopularBrands";

export default function HomePage() {
  const [filters, setFilters] = useState<GetCarsFilters>({});
  const [page, setPage] = useState(1);

  const handleFiltersChange = (newFilters: GetCarsFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleBrandSelect = (brand: string) => {
    handleFiltersChange({
      ...filters,
      brand: brand || undefined,
      model: undefined, // Сбрасываем модель при смене бренда
    });
  };

  const handleFiltersReset = () => {
    setFilters({});
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PostsBanner />
      <section className={styles.header}>
        <h1 className={styles.title}>Каталог автомобилей</h1>
      </section>
      <section className={styles.intro} aria-label="О сайте">
        <p className={styles.introText}>
          Turbo20.ru — мы собираем редкие и интересные автомобили с мировых сайтов
          в одном месте. Помогаем мечтать об интересном авто или найти машину своей мечты.
        </p>
      </section>

      <PopularBrands
        filters={filters}
        onBrandSelect={handleBrandSelect}
      />

      <CarFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onFiltersReset={handleFiltersReset}
      />
      <section>
        <CarList
          filters={filters}
          page={page}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
