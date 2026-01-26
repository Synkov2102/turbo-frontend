"use client";

import { FC, useState } from "react";
import { Typography } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { formatPriceRUB, formatPriceUSD, formatPriceEUR, formatPriceRange } from "@/entities/car/lib/car-utils";
import styles from "./PriceDisplay.module.css";

interface PriceDisplayProps {
  price?: {
    RUB?: number;
    USD?: number;
    EUR?: number;
  };
  startingPrice?: {
    RUB?: number;
    USD?: number;
    EUR?: number;
  };
  variant?: "card" | "details";
  className?: string;
}

export const PriceDisplay: FC<PriceDisplayProps> = ({
  price,
  startingPrice,
  variant = "card",
  className,
}) => {
  const [showAllCurrencies, setShowAllCurrencies] = useState(false);

  const hasPrice = price && (price.RUB || price.USD || price.EUR);
  const hasStartingPrice = startingPrice && (startingPrice.RUB || startingPrice.USD || startingPrice.EUR);
  const hasMultipleCurrencies = 
    (price && ((price.USD && price.RUB) || (price.EUR && price.RUB) || (price.USD && price.EUR))) ||
    (startingPrice && ((startingPrice.USD && startingPrice.RUB) || (startingPrice.EUR && startingPrice.RUB) || (startingPrice.USD && startingPrice.EUR)));

  const getFormattedPrices = () => {
    if (hasStartingPrice && hasPrice) {
      return formatPriceRange(startingPrice, price);
    }
    if (hasStartingPrice) {
      return {
        RUB: formatPriceRUB(startingPrice),
        USD: formatPriceUSD(startingPrice),
        EUR: formatPriceEUR(startingPrice),
      };
    }
    if (hasPrice) {
      return {
        RUB: formatPriceRUB(price),
        USD: formatPriceUSD(price),
        EUR: formatPriceEUR(price),
      };
    }
    return { RUB: undefined, USD: undefined, EUR: undefined };
  };

  const prices = getFormattedPrices();
  const hasOtherCurrencies = !!(prices.USD || prices.EUR);

  if (!hasPrice && !hasStartingPrice) {
    return null;
  }

  const handleToggleCurrencies = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllCurrencies(!showAllCurrencies);
  };

  const containerClass = `${styles.container} ${variant === "details" ? styles.containerDetails : styles.containerCard} ${className || ""}`;

  return (
    <div className={containerClass}>
      <div className={styles.priceRow}>
        {prices.RUB && (
          variant === "details" ? (
            <Typography variant="h5" className={styles.price}>
              {prices.RUB}
            </Typography>
          ) : (
            <span className={styles.price}>
              {prices.RUB}
            </span>
          )
        )}
        {hasMultipleCurrencies && (
          <button
            className={styles.currencyToggle}
            onClick={handleToggleCurrencies}
            type="button"
            title={showAllCurrencies ? "Скрыть валюты" : "Показать валюты"}
            aria-expanded={showAllCurrencies}
          >
            <CurrencyExchangeIcon fontSize="small" />
          </button>
        )}
      </div>
      {hasOtherCurrencies && (
        <div 
          className={`${styles.otherCurrencies} ${showAllCurrencies ? styles.otherCurrenciesOpen : ""}`}
        >
          {prices.USD && (
            variant === "details" ? (
              <Typography variant="body1" className={styles.otherPrice}>
                {prices.USD}
              </Typography>
            ) : (
              <span className={styles.otherPrice}>{prices.USD}</span>
            )
          )}
          {prices.EUR && (
            variant === "details" ? (
              <Typography variant="body1" className={styles.otherPrice}>
                {prices.EUR}
              </Typography>
            ) : (
              <span className={styles.otherPrice}>{prices.EUR}</span>
            )
          )}
        </div>
      )}
    </div>
  );
};

