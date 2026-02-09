"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Typography,
  Chip,
  Button,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { usePost } from "@/entities/post/model/hooks";
import styles from "./PostDetails.module.css";
import { InfoCard } from "@/shared/ui/info-card";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { ImageFullscreenGallery } from "@/shared/ui/image-fullscreen-gallery";
import { PostDetailsSkeleton } from "./PostDetailsSkeleton";
import { TwemojiText } from "@/shared/ui/twemoji";

interface PostDetailsProps {
  postId: string;
}

export const PostDetails: FC<PostDetailsProps> = ({ postId }) => {
  const { data: post, isLoading, error } = usePost(postId);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return <PostDetailsSkeleton />;
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

  if (!post) {
    return (
      <Container className={styles.root}>
        <Typography variant="body1">Пост не найден.</Typography>
      </Container>
    );
  }

  const images = post.images ?? [];
  const hasImages = images.length > 0;
  const formattedDate = new Date(post.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container className={styles.root} disableGutters>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Посты", href: "/posts" },
          {
            label:
              post.title.length > 60 ? `${post.title.slice(0, 57)}…` : post.title,
          },
        ]}
      />
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <TwemojiText as="h2" className={styles.title}>
            {post.title}
          </TwemojiText>
        </div>
        {post.url && (
          <Button
            component={Link}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            className={styles.vkButton}
          >
            Читать в VK
          </Button>
        )}
      </div>

      <div className={styles.badges}>
        <Chip label={formattedDate} size="small" color="primary" />
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
                {images.map((img, index) => (
                  <SwiperSlide key={img + index}>
                    <div
                      className={styles.mainImageWrapper}
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <Image
                        src={img}
                        alt={`${post.title} ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {images.length > 1 && (
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
                    <SwiperSlide key={img + index}>
                      <div className={styles.thumbItem}>
                        <Image
                          src={img}
                          alt={`${post.title} превью ${index + 1}`}
                          fill
                          sizes="(max-width: 600px) 25vw, (max-width: 900px) 20vw, 16vw"
                          style={{ objectFit: "cover" }}
                          unoptimized
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
          <InfoCard title="Текст поста">
            <TwemojiText as="p" className={styles.text}>
              {post.text}
            </TwemojiText>
          </InfoCard>
        </div>
      </div>

      {isGalleryOpen && (
        <ImageFullscreenGallery
          open
          images={images}
          initialIndex={activeImageIndex}
          title={post.title}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </Container>
  );
};
