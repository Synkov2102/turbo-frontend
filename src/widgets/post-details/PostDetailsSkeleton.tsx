"use client";

import { FC } from "react";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import styles from "./PostDetailsSkeleton.module.css";

/**
 * Скелетон загрузки для детальной страницы поста.
 */
export const PostDetailsSkeleton: FC = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Посты", href: "/posts" },
          { label: "..." },
        ]}
      />

      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <div className={styles.titleSkeleton} />
          <div className={styles.dateSkeleton} />
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* КОЛОНКА С ФОТО / КАРУСЕЛЬ */}
        <div className={styles.imageColumn}>
          <div className={styles.imageSkeleton} />
          <div className={styles.thumbsContainer}>
            <div className={styles.thumbSkeleton} />
            <div className={styles.thumbSkeleton} />
            <div className={styles.thumbSkeleton} />
            <div className={styles.thumbSkeleton} />
          </div>
        </div>

        {/* КОЛОНКА С ТЕКСТОМ */}
        <div className={styles.contentBlock}>
          <div className={styles.textContent}>
            <div className={styles.textLines}>
              <div className={styles.textLine} />
              <div className={styles.textLine} />
              <div className={styles.textLine} />
              <div className={styles.textLine} />
              <div className={styles.textLine} />
              <div className={styles.textLineShort} />
            </div>
          </div>

          <div className={styles.buttonSkeleton} />
        </div>
      </div>
    </>
  );
};


