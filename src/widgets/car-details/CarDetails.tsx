"use client";

import { FC } from "react";
import Link from "next/link";
import {
  Typography,
  Chip,
  Button,
} from "@mui/material";

import { useCar } from "@/entities/car/model/hooks";
import styles from "./CarDetails.module.css";
import { InfoCard } from "@/shared/ui/info-card";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { ImageCarousel } from "@/shared/ui/image-carousel";
import { CarDetailsSkeleton } from "./CarDetailsSkeleton";

interface CarDetailsProps {
  carId: string;
}

export const CarDetails: FC<CarDetailsProps> = ({ carId }) => {
  const { data: car, isLoading, error } = useCar(carId);

  if (isLoading) {
    return <CarDetailsSkeleton />;
  }

  if (error) {
    return (
      <div>
        <Typography color="error" variant="body1">
          Ошибка загрузки данных: {(error as Error).message}
        </Typography>
      </div>
    );
  }

  if (!car) {
    return (
      <div>
        <Typography variant="body1">Автомобиль не найден.</Typography>
      </div>
    );
  }

  const hasImages = !!car.images && car.images.length > 0;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          {
            label:
              car.title.length > 60 ? `${car.title.slice(0, 57)}…` : car.title,
          },
        ]}
      />
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <Typography variant="h4" component="h1" className={styles.title}>
            {car.title}
          </Typography>
        </div>

        {car.price?.RUB && (
          <Typography variant="h4" className={styles.price}>
            <span className={styles.mainPrice}>
              {car.price.RUB.toLocaleString("ru-RU")} ₽
            </span>
            {(car.price.USD || car.price.EUR) && (
              <span className={styles.otherCurrencies}>
                {car.price.USD && (
                  <span className={styles.currency}>
                    / {car.price.USD.toLocaleString("ru-RU")} $
                  </span>
                )}
                {car.price.EUR && (
                  <span className={styles.currency}>
                    / {car.price.EUR.toLocaleString("ru-RU")} €
                  </span>
                )}
              </span>
            )}
          </Typography>
        )}
      </div>

      <div className={styles.badges}>
        {car.status === "active" && (
          <Chip
            label="Активно"
            size="small"
            color="success"
            sx={{ fontWeight: 600 }}
          />
        )}
        {car.status === "sold" && (
          <Chip
            label="Продано"
            size="small"
            color="error"
            sx={{ fontWeight: 600 }}
          />
        )}
        {car.year && (
          <Chip label={`${car.year} г.`} size="small" color="primary" />
        )}
        {car.mileage && (
          <Chip
            label={`${car.mileage.toLocaleString("ru-RU")} км`}
            size="small"
            variant="outlined"
          />
        )}
        {(car.location?.city || car.city) && (
          <Chip
            label={
              car.location?.city || car.city
                ? `${car.location?.city || car.city}${car.location?.country ? `, ${car.location.country}` : ""}`
                : ""
            }
            size="small"
            variant="outlined"
          />
        )}
      </div>

      <div className={styles.mainContent}>
        {/* КОЛОНКА С ФОТО / КАРУСЕЛЬ */}
        {hasImages && (
          <div className={styles.imageColumn}>
            <ImageCarousel
              images={car.images!}
              title={car.title}
              alt={car.title}
            />
          </div>
        )}

        {/* КОЛОНКА С ИНФОЙ */}
        <div className={`${styles.infoBlock} ${!hasImages ? styles.infoBlockFullWidth : ""}`}>
          <InfoCard
            title="Характеристики"
            bodyClassName={styles.specGrid}
            className={styles.specsCard}
          >
            {car.brand && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Марка</span>
                <span className={styles.specValue}>{car.brand}</span>
              </div>
            )}
            {car.model && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Модель</span>
                <span className={styles.specValue}>{car.model}</span>
              </div>
            )}
            {car.year && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Год выпуска</span>
                <span className={styles.specValue}>{car.year}</span>
              </div>
            )}
            {car.engineVolume && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Объём двигателя</span>
                <span className={styles.specValue}>{car.engineVolume} л</span>
              </div>
            )}
            {car.transmission && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>КПП</span>
                <span className={styles.specValue}>{car.transmission}</span>
              </div>
            )}
            {(car.location?.city || car.city) && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Город</span>
                <span className={styles.specValue}>
                  {car.location?.city || car.city}
                  {car.location?.country && `, ${car.location.country}`}
                </span>
              </div>
            )}
          </InfoCard>

          {car.description && (
            <InfoCard title="Описание">
              <Typography variant="body2" className={styles.description}>
                {car.description}
              </Typography>
            </InfoCard>
          )}

          {car.url && (
            <Button
              component={Link}
              href={car.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
            >
              Открыть объявление
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
