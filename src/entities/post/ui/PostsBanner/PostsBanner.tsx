"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./PostsBanner.module.css";
import { BannerPostCard } from "./BannerPostCard";
import { usePosts } from "@/entities/post/model/hooks";

const POSTS_LIMIT = 5;

/**
 * Баннер постов в виде слайдера.
 * Отображает последние посты на главной странице.
 */
export const PostsBanner: FC = () => {
  const { data, isLoading, error } = usePosts({ page: 1, limit: POSTS_LIMIT });

  if (isLoading || error || !data || data.data.length === 0) {
    return null;
  }

  const posts = data.data;
  const hasMultiplePosts = posts.length > 1;

  return (
    <section className={styles.banner}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={hasMultiplePosts}
        className={styles.swiper}
      >
        {posts.map((post, index) => (
          <SwiperSlide key={`${post.createdAt}-${index}`}>
            <BannerPostCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
