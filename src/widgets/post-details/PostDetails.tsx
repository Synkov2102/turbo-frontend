"use client";

import { FC } from "react";
import Link from "next/link";
import { Typography, Button } from "@mui/material";

import { usePost } from "@/entities/post/model/hooks";
import styles from "./PostDetails.module.css";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { ImageCarousel } from "@/shared/ui/image-carousel";
import { TwemojiText } from "@/shared/ui/twemoji";
import { PostDetailsSkeleton } from "./PostDetailsSkeleton";

interface PostDetailsProps {
  postId: string;
}

/**
 * Детальная страница поста с каруселью изображений и полным текстом.
 */
export const PostDetails: FC<PostDetailsProps> = ({ postId }) => {
  const { data: post, isLoading, error } = usePost(postId);

  if (isLoading) {
    return <PostDetailsSkeleton />;
  }

  if (error) {
    return (
      <div>
        <Typography color="error" variant="body1">
          Ошибка загрузки данных: {(error as Error).message}
        </Typography>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Typography variant="body1">Пост не найден.</Typography>
      </div>
    );
  }

  const hasImages = !!post.images && post.images.length > 0;
  const formattedDate = new Date(post.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Посты", href: "/posts" },
          {
            label:
              post.title.length > 60
                ? `${post.title.slice(0, 57)}…`
                : post.title,
          },
        ]}
      />

      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <Typography variant="h4" component="h1" className={styles.title}>
            <TwemojiText as="span">{post.title}</TwemojiText>
          </Typography>
          <Typography variant="body2" className={styles.date}>
            {formattedDate}
          </Typography>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* КОЛОНКА С ФОТО / КАРУСЕЛЬ */}
        {hasImages && (
          <div className={styles.imageColumn}>
            <ImageCarousel
              images={post.images || []}
              title={post.title}
              alt={post.title}
            />
          </div>
        )}

        {/* КОЛОНКА С ТЕКСТОМ */}
        <div className={styles.contentBlock}>
          <div className={styles.textContent}>
            <TwemojiText as="div" className={styles.text}>
              {post.text}
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
              className={styles.linkButton}
            >
              Открыть ссылку
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
