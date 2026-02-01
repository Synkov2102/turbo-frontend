"use client";

import { FC } from "react";

import styles from "./CarCard.module.css";
import { Car } from "@/entities/car/model/types";
import PlaceIcon from "@mui/icons-material/Place";
import { generateCarTitle } from "@/entities/car/lib/car-utils";
import { getCountryFlag } from "@/entities/car/lib/country-flag";
import { PriceDisplay } from "@/shared/ui/price-display";
import { TwemojiText } from "@/shared/ui/twemoji";

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
        <PriceDisplay 
          price={car.price} 
          startingPrice={car.startingPrice}
          variant="card"
          className={styles.prices}
        />
          
        <div className={styles.footer}>
          {(car.location?.city || car.city) && (
            <span className={styles.city}>
              <PlaceIcon fontSize="small" />{" "}
              <TwemojiText as="span" className={styles.cityName}>
                {car.location?.city || car.city}
                {car.location?.country && (
                  <>
                    , {car.location.country}
                    {getCountryFlag(car.location.country) && ` ${getCountryFlag(car.location.country)}`}
                  </>
                )}
              </TwemojiText>
            </span>
          )}
        </div>
      </div>
    </a>
  );
};
