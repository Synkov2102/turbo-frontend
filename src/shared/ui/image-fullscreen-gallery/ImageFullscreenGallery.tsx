"use client";

import { FC, useState } from "react";
import { Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ImageFullscreenGallery.module.css";

interface ImageFullscreenGalleryProps {
  open: boolean;
  images: string[];
  initialIndex?: number;
  title?: string;
  onClose: () => void;
}

export const ImageFullscreenGallery: FC<ImageFullscreenGalleryProps> = ({
  open,
  images,
  initialIndex = 0,
  title,
  onClose,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  if (!images.length) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        className: styles.dialogPaper,
      }}
    >
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            {title && (
              <Typography variant="subtitle1" className={styles.title}>
                {title}
              </Typography>
            )}
            <Typography variant="caption" className={styles.counter}>
              {activeIndex + 1} / {images.length}
            </Typography>
          </div>

          <IconButton
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Закрыть"
          >
            <CloseIcon />
          </IconButton>
        </header>

        <div className={styles.content}>
          <div className={styles.mainSlider}>
            <Swiper
              className={styles.mainSwiper}
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={8}
              initialSlide={initialIndex}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {images.map((img, index) => (
                <SwiperSlide key={img + index}>
                  <div
                    className={styles.mainImageWrapper}
                    style={{ ["--bg-url" as any]: `url(${img})` }}
                  >
                    <img src={img} alt={`${title ?? "Фото"} ${index + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {images.length > 1 && (
            <div className={styles.thumbsWrapper}>
              <Swiper
                className={styles.thumbSwiper}
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress
                slidesPerView={8}
                spaceBetween={8}
                breakpoints={{
                  0: { slidesPerView: 4 },
                  600: { slidesPerView: 7 },
                  900: { slidesPerView: 8 },
                  1200: { slidesPerView: 14 },
                }}
              >
                {images.map((img, index) => (
                  <SwiperSlide key={img + index}>
                    <div className={styles.thumbItem}>
                      <img
                        src={img}
                        alt={`${title ?? "Фото"} превью ${index + 1}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};
