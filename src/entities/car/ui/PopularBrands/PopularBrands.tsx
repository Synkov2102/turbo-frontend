"use client";

import { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import styles from "./PopularBrands.module.css";
import { GetCarsFilters } from "@/entities/car/model/types";
import { useBrandStats } from "@/entities/car/model/hooks";

interface PopularBrandsProps {
  filters: GetCarsFilters;
  onBrandSelect: (brand: string) => void;
}

// Карта логотипов для брендов, для которых у нас есть картинки
const BRAND_LOGO_MAP: Record<
  string,
  {
    logo: string;
    fallback: string;
  }
> = {
  "Mercedes-Benz": { logo: "/brands/mercedes.webp", fallback: "MB" },
  BMW: { logo: "/brands/bmw.webp", fallback: "BMW" },
  Audi: { logo: "/brands/audi.webp", fallback: "AUDI" },
  Porsche: { logo: "/brands/porsche.webp", fallback: "P" },
  Volkswagen: { logo: "/brands/volkswagen.webp", fallback: "VW" },
  Ferrari: { logo: "/brands/ferrari.webp", fallback: "F" },
  Lamborghini: { logo: "/brands/lamborghini.webp", fallback: "L" },
  "Alfa Romeo": { logo: "/brands/alfa-romeo.webp", fallback: "AR" },
  Jaguar: { logo: "/brands/jaguar.webp", fallback: "JAG" },
  MG: { logo: "/brands/mg.webp", fallback: "MG" },
  Citroen: { logo: "/brands/citroen.webp", fallback: "CIT" },
  "Aston Martin": { logo: "/brands/aston-martin.webp", fallback: "AM" },
  Fiat: { logo: "/brands/fiat.webp", fallback: "FIA" },
  Triumph: { logo: "/brands/triumph.webp", fallback: "TRI" },
  Bentley: { logo: "/brands/bentley.webp", fallback: "BEN" },
  Ford: { logo: "/brands/ford.webp", fallback: "FOR" },
  Renault: { logo: "/brands/renault.webp", fallback: "REN" },
  "Rolls-Royce": { logo: "/brands/rolls-royce.webp", fallback: "RR" },
  McLaren: { logo: "/brands/mclaren.webp", fallback: "MCL" },
  Lotus: { logo: "/brands/lotus.webp", fallback: "LOT" },
  Mini: { logo: "/brands/mini.webp", fallback: "MIN" },
};

export const PopularBrands: FC<PopularBrandsProps> = ({
  filters,
  onBrandSelect,
}) => {
  const selectedBrand = filters.brand;
  const { data: brandStats } = useBrandStats();
  const brands = brandStats?.slice(0, 15) ?? [];

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
        {brands.map((brand) => {
          const isSelected = selectedBrand === brand.brand;
          const logoConfig =
            BRAND_LOGO_MAP[brand.brand] ?? {
              logo: "/brands/default.webp",
              fallback: brand.brand.slice(0, 3).toUpperCase(),
            };

          return (
            <SwiperSlide key={brand.brand} className={styles.slide}>
              <Tooltip
                title={`${brand.brand} (${brand.count.toLocaleString("ru-RU")})`}
                arrow
              >
                <div className={styles.brandWrapper}>
                  <IconButton
                    className={`${styles.brandButton} ${
                      isSelected ? styles.selected : ""
                    }`}
                    onClick={() => handleBrandClick(brand.brand)}
                    aria-label={brand.brand}
                  >
                    <img
                      src={logoConfig.logo}
                      alt={brand.brand}
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
                    <span
                      className={styles.logoFallback}
                      style={{ display: "none" }}
                    >
                      {logoConfig.fallback}
                    </span>
                  </IconButton>
                  <span className={styles.countBadge}>
                    {brand.count.toLocaleString("ru-RU")}
                  </span>
                </div>
              </Tooltip>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

