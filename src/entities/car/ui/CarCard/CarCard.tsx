"use client";

import { FC } from "react";

import styles from "./CarCard.module.css";
import { Car } from "@/entities/car/model/types";
import PlaceIcon from "@mui/icons-material/Place";

interface CarCardProps {
  car: Car;
}

const getStatusLabel = (status?: string): string | null => {
  switch (status) {
    case "active":
      return "Активно";
    case "sold":
      return "Продано";
    default:
      return null;
  }
};

const getStatusClassName = (status?: string): string => {
  switch (status) {
    case "active":
      return styles.statusActive;
    case "sold":
      return styles.statusSold;
    default:
      return "";
  }
};

export const CarCard: FC<CarCardProps> = ({ car }) => {
  const mainImage = car.images?.[0];
  const statusLabel = getStatusLabel(car.status);
  const statusClassName = getStatusClassName(car.status);

  return (
    <a href={`/cars/${car.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {mainImage ? (
          // при желании здесь можно использовать next/image
          <img src={mainImage} alt={car.title} />
        ) : (
          <div className={styles.placeholder}>Нет фото</div>
        )}
        {statusLabel && (
          <div className={`${styles.statusBadge} ${statusClassName}`}>
            {statusLabel}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{car.title}</div>

        <div className={styles.footer}>
          {car.price?.RUB && (
            <span className={styles.price}>
              {car.price.RUB.toLocaleString("ru-RU")} ₽
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
            </span>
          )}
          {(car.location?.city || car.city) && (
            <span className={styles.city}>
              <PlaceIcon fontSize="small" />{" "}
              <span className={styles.cityName}>
                {car.location?.city || car.city}
                {car.location?.country && `, ${car.location.country}`}
              </span>
            </span>
          )}
        </div>
      </div>
    </a>
  );
};
