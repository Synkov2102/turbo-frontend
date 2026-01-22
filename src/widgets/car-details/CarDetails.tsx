"use client";

import { FC, useState } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useCar } from "@/entities/car/model/hooks";
import styles from "./CarDetails.module.css";
import { InfoCard } from "@/shared/ui/info-card";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { ImageFullscreenGallery } from "@/shared/ui/image-fullscreen-gallery";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  formatEngineVolume,
  generateCarTitle,
  getCountryFlag,
} from "@/entities/car/lib/car-utils";
import { TwemojiText } from "@/shared/ui/twemoji";

interface CarDetailsProps {
  carId: string;
}

export const CarDetails: FC<CarDetailsProps> = ({ carId }) => {
  const { data: car, isLoading, error } = useCar(carId);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showCurrencies, setShowCurrencies] = useState(false);

  if (isLoading) {
    return (
      <Container className={styles.root}>
        <div className={styles.loader}>
          <CircularProgress />
          <Typography variant="body2" mt={2}>
            Загрузка автомобиля...
          </Typography>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={styles.root}>
        <Typography color="error" variant="body1">
          Ошибка загрузки данных: {(error as Error).message}
        </Typography>
      </Container>
    );
  }

  if (!car) {
    return (
      <Container className={styles.root}>
        <Typography variant="body1">Автомобиль не найден.</Typography>
      </Container>
    );
  }

  const hasImages = !!car.images && car.images.length > 0;
  const carTitle = generateCarTitle(car);
  const countryFlag = getCountryFlag(car.location?.country);
  const sourceDomain = (() => {
    try {
      const hostname = new URL(car.url).hostname;
      return hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();

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

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          {
            label:
              carTitle.length > 60 ? `${carTitle.slice(0, 57)}…` : carTitle,
          },
        ]}
      />
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <Typography variant="h5" component="h1" className={styles.title}>
            {carTitle}
          </Typography>
        </div>

        <div className={styles.priceBlock}>
          {hasAnyPrice && (
            <div className={styles.priceSection}>
              <div className={styles.priceRow}>
                <Typography variant="h5" className={styles.price}>
                  {rubPriceText}
                </Typography>
                {hasOtherCurrencies && (
                  <Tooltip
                    title={showCurrencies ? "Скрыть валюты" : "Показать валюты"}
                  >
                    <IconButton
                      size="small"
                      className={styles.currencyBtn}
                      onClick={() => setShowCurrencies(!showCurrencies)}
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
        </div>
      </div>

      <div className={styles.badges}>
        {car.listingType === "auction" && (
          <Chip label="Аукцион" size="small" color="secondary" />
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
              <TwemojiText as="span">
                {`${car.location?.city || car.city}${
                  car.location?.country ? ", " + car.location.country : ""
                }${countryFlag ? " " + countryFlag : ""}`}
              </TwemojiText>
            }
            size="small"
            variant="outlined"
          />
        )}
      </div>

      <div className={styles.mainContent}>
        {/* КОЛОНКА С ФОТО / КАРУСЕЛЬ */}
        <div className={styles.imageColumn}>
          {hasImages ? (
            <>
              <Swiper
                className={styles.mainSwiper}
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                onSlideChange={(swiper) => {
                  setActiveImageIndex(swiper.activeIndex);
                }}
                spaceBetween={8}
              >
                {car.images!.map((img, index) => (
                  <SwiperSlide key={img + index}>
                    <div
                      className={styles.mainImageWrapper}
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <img src={img} alt={`${car.title} ${index + 1}`} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {car.images!.length > 1 && (
                <Swiper
                  className={styles.thumbSwiper}
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  watchSlidesProgress
                  slidesPerView={4}
                  spaceBetween={8}
                  breakpoints={{
                    0: { slidesPerView: 4 },
                    600: { slidesPerView: 5 },
                    900: { slidesPerView: 6 },
                  }}
                >
                  {car.images!.map((img, index) => (
                    <SwiperSlide key={img + index}>
                      <div className={styles.thumbItem}>
                        <img
                          src={img}
                          alt={`${car.title} превью ${index + 1}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          ) : (
            <div className={styles.mainImageWrapper}>
              <div className={styles.imagePlaceholder}>Нет фото</div>
            </div>
          )}

          {car.url && (
            <Button
              component={Link}
              href={car.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              className={styles.sourceButton}
            >
              Открыть источник{sourceDomain ? `: ${sourceDomain}` : ""}
            </Button>
          )}
        </div>

        {/* КОЛОНКА С ИНФОЙ */}
        <div className={styles.infoBlock}>
          <InfoCard title="Характеристики" bodyClassName={styles.specGrid}>
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
            {/* Некоторые источники отдают 0 как "нет данных", не показываем такое значение */}
            {car.engineVolume !== undefined &&
              car.engineVolume !== null &&
              car.engineVolume !== 0 && (
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Объём двигателя</span>
                  <span className={styles.specValue}>
                    {formatEngineVolume(car.engineVolume)} л
                  </span>
                </div>
              )}
            {car.transmission && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>КПП</span>
                <span className={styles.specValue}>{car.transmission}</span>
              </div>
            )}
            {car.city && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Город</span>
                <span className={styles.specValue}>
                  {car.city}
                  {car.location?.country && `, ${car.location.country}`}
                  {countryFlag && (
                    <TwemojiText as="span">{` ${countryFlag}`}</TwemojiText>
                  )}
                </span>
              </div>
            )}
          </InfoCard>

          {car.description && (
            <InfoCard title="Описание">
              {car.description
                .split(/\n{2,}|\r\n\r\n/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    className={styles.description}
                    paragraph
                  >
                    {paragraph}
                  </Typography>
                ))}
            </InfoCard>
          )}

        </div>
      </div>
      {isGalleryOpen && (
        <ImageFullscreenGallery
          open
          images={car.images ?? []}
          initialIndex={activeImageIndex}
          title={car.title}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </>
  );
};
