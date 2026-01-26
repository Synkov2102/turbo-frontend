"use client";

import { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import styles from "./PopularBrands.module.css";
import { GetCarsFilters } from "@/entities/car/model/types";

interface PopularBrandsProps {
  filters: GetCarsFilters;
  onBrandSelect: (brand: string) => void;
}

// Популярные классические марки автомобилей
const POPULAR_BRANDS = [
  { name: "Mercedes-Benz", logo: "/brands/mercedes.webp", fallback: "MB" },
  { name: "BMW", logo: "/brands/bmw.webp", fallback: "BMW" },
  { name: "Audi", logo: "/brands/audi.webp", fallback: "AUDI" },
  { name: "Porsche", logo: "/brands/porsche.webp", fallback: "P" },
  { name: "Volkswagen", logo: "/brands/volkswagen.webp", fallback: "VW" },
  { name: "Ferrari", logo: "/brands/ferrari.webp", fallback: "F" },
  { name: "Lamborghini", logo: "/brands/lamborghini.webp", fallback: "L" },
  { name: "Alfa Romeo", logo: "/brands/alfa-romeo.webp", fallback: "AR" },
];

export const PopularBrands: FC<PopularBrandsProps> = ({
  filters,
  onBrandSelect,
}) => {
  const selectedBrand = filters.brand;

  const handleBrandClick = (brand: string) => {
    if (selectedBrand === brand) {
      // Если бренд уже выбран, снимаем фильтр
      onBrandSelect("");
    } else {
      // Применяем фильтр по бренду
      onBrandSelect(brand);
    }
  };

  return (
    <div className={styles.container}>
      <Swiper
        modules={[FreeMode]}
        spaceBetween={0}
        slidesPerView="auto"
        freeMode
        className={styles.swiper}
      >
        {POPULAR_BRANDS.map((brand) => {
          const isSelected = selectedBrand === brand.name;
          return (
            <SwiperSlide key={brand.name} className={styles.slide}>
              <Tooltip title={brand.name} arrow>
                <IconButton
                  className={`${styles.brandButton} ${
                    isSelected ? styles.selected : ""
                  }`}
                  onClick={() => handleBrandClick(brand.name)}
                  aria-label={brand.name}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={styles.logoImage}
                    onError={(e) => {
                      // Если изображение не загрузилось, показываем текстовый fallback
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = "block";
                      }
                    }}
                  />
                  <span className={styles.logoFallback} style={{ display: "none" }}>
                    {brand.fallback}
                  </span>
                </IconButton>
              </Tooltip>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

