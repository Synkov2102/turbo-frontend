"use client";

import { FC } from "react";
import Link from "next/link";
import { Post } from "@/entities/post/model/types";
import { TwemojiText } from "@/shared/ui/twemoji";
import styles from "./BannerPostCard.module.css";

interface BannerPostCardProps {
  post: Post;
}

/**
 * Карточка поста для баннера (слайдера).
 * Отображает изображение в формате 4:3 с наложенным заголовком.
 */
export const BannerPostCard: FC<BannerPostCardProps> = ({ post }) => {
  const mainImage = post.images?.[0];

  if (!mainImage) {
    return null;
  }

  const content = (
    <div className={styles.imageWrapper}>
      <img src={mainImage} alt={post.title} />
      <div className={styles.titleOverlay}>
        <TwemojiText as="h2" className={styles.title} banner>
          {post.title}
        </TwemojiText>
      </div>
    </div>
  );

  const cardClassName = styles.card;

  return (
    <Link href={`/posts/${post.id}`} className={cardClassName}>
      {content}
    </Link>
  );
};
