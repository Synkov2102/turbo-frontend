"use client";

import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ImageCarousel.module.css";
import { ImageFullscreenGallery } from "../image-fullscreen-gallery";

interface ImageCarouselProps {
  images: string[];
  title?: string;
  alt?: string;
  onImageClick?: (index: number) => void;
  className?: string;
}

/**
 * Карусель изображений с миниатюрами и поддержкой полноэкранного просмотра.
 */
export const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  title,
  alt,
  onImageClick,
  className,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`${styles.container} ${className || ""}`}>
        <div className={styles.mainImageWrapper}>
          <div className={styles.imagePlaceholder}>Нет фото</div>
        </div>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    setIsGalleryOpen(true);
    onImageClick?.(index);
  };

  const hasMultipleImages = images.length > 1;

  return (
    <>
      <div className={`${styles.container} ${className || ""}`}>
        <Swiper
          className={styles.mainSwiper}
          modules={[Navigation, Thumbs]}
          navigation={hasMultipleImages}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => {
            setActiveImageIndex(swiper.activeIndex);
          }}
          spaceBetween={8}
        >
          {images.map((img, index) => (
            <SwiperSlide key={`${img}-${index}`}>
              <div
                className={styles.mainImageWrapper}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={img}
                  alt={alt ? `${alt} ${index + 1}` : `Фото ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {hasMultipleImages && (
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
            {images.map((img, index) => (
              <SwiperSlide key={`thumb-${img}-${index}`}>
                <div className={styles.thumbItem}>
                  <img
                    src={img}
                    alt={alt ? `${alt} превью ${index + 1}` : `Превью ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {isGalleryOpen && (
        <ImageFullscreenGallery
          open={isGalleryOpen}
          images={images}
          initialIndex={activeImageIndex}
          title={title}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </>
  );
};


