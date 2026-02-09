"use client";

import { FC } from "react";
import Link from "next/link";
import styles from "./PostCard.module.css";
import { Post } from "@/entities/post/model/types";
import { TwemojiText } from "@/shared/ui/twemoji";

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

/**
 * Карточка поста для списков и детальных страниц.
 * Отображает изображение, заголовок, текст и дату.
 */
export const PostCard: FC<PostCardProps> = ({ post, compact = false }) => {
  const mainImage = post.images?.[0];
  const formattedDate = new Date(post.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const titleTag = compact ? "h2" : "h3";
  const cardClassName = `${styles.card} ${compact ? styles.compact : ""}`;

  const content = (
    <>
      {mainImage && (
        <div className={styles.imageWrapper}>
          <img src={mainImage} alt={post.title} />
        </div>
      )}
      <div className={styles.content}>
        <TwemojiText as={titleTag} className={styles.title}>
          {post.title}
        </TwemojiText>
        <TwemojiText as="p" className={styles.text}>
          {post.text}
        </TwemojiText>
        <div className={styles.footer}>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </div>
    </>
  );

  return (
    <Link href={`/posts/${post.id}`} className={cardClassName}>
      {content}
    </Link>
  );
};
