"use client";

import { FC, useState } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  Chip,
  CircularProgress,
  Button,
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

interface CarDetailsProps {
  carId: string;
}

export const CarDetails: FC<CarDetailsProps> = ({ carId }) => {
  const { data: car, isLoading, error } = useCar(carId);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
          <Typography variant="h5" component="h1" className={styles.title}>
            {car.title}
          </Typography>
        </div>

        {car.price && (
          <Typography variant="h5" className={styles.price}>
            {car.price.toLocaleString("ru-RU")} ₽
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
        {car.city && <Chip label={car.city} size="small" variant="outlined" />}
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
            {car.city && (
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Город</span>
                <span className={styles.specValue}>{car.city}</span>
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
