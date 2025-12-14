"use client";

import { FC } from "react";

import styles from "./CarCard.module.css";
import { Car } from "@/entities/car/model/types";
import PlaceIcon from "@mui/icons-material/Place";

interface CarCardProps {
  car: Car;
}

export const CarCard: FC<CarCardProps> = ({ car }) => {
  const mainImage = car.images?.[0];

  return (
    <a href={`/cars/${car.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {mainImage ? (
          // при желании здесь можно использовать next/image
          <img src={mainImage} alt={car.title} />
        ) : (
          <div className={styles.placeholder}>Нет фото</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{car.title}</div>

        <div className={styles.footer}>
          {car.price && (
            <span className={styles.price}>
              {car.price.toLocaleString("ru-RU")} ₽
            </span>
          )}
          {car.city && (
            <span className={styles.city}>
              <PlaceIcon fontSize="small" />{" "}
              <span className={styles.cityName}>{car.city}</span>
            </span>
          )}
        </div>
      </div>
    </a>
  );
};
