"use client";

import { FC } from "react";

import styles from "./CarCard.module.css";
import { Car } from "@/entities/car/model/types";
import PlaceIcon from "@mui/icons-material/Place";
import { generateCarTitle, formatPrice } from "@/entities/car/lib/car-utils";

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
  const carTitle = generateCarTitle(car);
  const hasPrice = car.price && (car.price.RUB || car.price.USD || car.price.EUR);
  const hasStartingPrice = car.startingPrice && (car.startingPrice.RUB || car.startingPrice.USD || car.startingPrice.EUR);

  return (
    <a href={`/cars/${car.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {mainImage ? (
          <img src={mainImage} alt={carTitle} />
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
        <div className={styles.title}>{carTitle}</div>
        {(hasPrice || hasStartingPrice) && (
            <div className={styles.prices}>
              {hasPrice && (
                <span className={styles.price}>
                  {formatPrice(car.price)}
                </span>
              )}
              {hasStartingPrice && (
                <span className={styles.startingPrice}>
                  от {formatPrice(car.startingPrice)}
                </span>
              )}
            </div>
          )}
          
        <div className={styles.footer}>
         
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
