"use client";

import { FC, useState } from "react";

import styles from "./CarCard.module.css";
import { Car } from "@/entities/car/model/types";
import PlaceIcon from "@mui/icons-material/Place";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { IconButton, Tooltip } from "@mui/material";
import { generateCarTitle, getCountryFlag } from "@/entities/car/lib/car-utils";
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
  const [showCurrencies, setShowCurrencies] = useState(false);

  const formatMoney = (value: number, suffix: string) =>
    `${value.toLocaleString("ru-RU")} ${suffix}`;

  const rubPriceText = (() => {
    const full = car.price?.RUB;
    const start = car.startingPrice?.RUB;

    if (start && full) return `${formatMoney(start, "₽")} — ${formatMoney(full, "₽")}`;
    if (start) return formatMoney(start, "₽");
    if (full) return formatMoney(full, "₽");
    return "";
  })();

  const currencyLines = (() => {
    const lines: Array<{ code: "USD" | "EUR"; text: string }> = [];
    const currencies: Array<"USD" | "EUR"> = ["USD", "EUR"];

    for (const code of currencies) {
      const full = car.price?.[code];
      const start = car.startingPrice?.[code];
      if (!full && !start) continue;

      const suffix = code === "USD" ? "$" : "€";
      const text =
        start && full
          ? `${formatMoney(start, suffix)} — ${formatMoney(full, suffix)}`
          : start
            ? formatMoney(start, suffix)
            : formatMoney(full!, suffix);
      lines.push({ code, text });
    }

    return lines;
  })();

  const hasAnyPrice = !!rubPriceText;
  const hasOtherCurrencies = currencyLines.length > 0;
  const countryFlag = getCountryFlag(car.location?.country);

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
        {hasAnyPrice && (
          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <span className={styles.price}>{rubPriceText}</span>
              {hasOtherCurrencies && (
                <Tooltip title={showCurrencies ? "Скрыть валюты" : "Показать валюты"}>
                  <IconButton
                    size="small"
                    className={styles.currencyBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowCurrencies(!showCurrencies);
                    }}
                    aria-label="Показать цены в других валютах"
                  >
                    <CurrencyExchangeIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            {showCurrencies && hasOtherCurrencies && (
              <div className={styles.currenciesList}>
                {currencyLines.map((line) => (
                  <div key={line.code} className={styles.currencyItem}>
                    <span className={styles.currencyCode}>{line.code}:</span>
                    <span className={styles.currencyPrice}>{line.text}</span>
                  </div>
                ))}
              </div>
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
                {countryFlag && (
                  <TwemojiText as="span" className={styles.cityFlag}>
                    {countryFlag}
                  </TwemojiText>
                )}
              </span>
            </span>
          )}
        </div>
      </div>
    </a>
  );
};
