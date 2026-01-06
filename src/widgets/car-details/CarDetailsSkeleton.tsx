"use client";

import { FC } from "react";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import styles from "./CarDetailsSkeleton.module.css";

/**
 * Скелетон загрузки для детальной страницы автомобиля.
 */
export const CarDetailsSkeleton: FC = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "..." },
        ]}
      />

      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <div className={styles.titleSkeleton} />
        </div>
        <div className={styles.priceSkeleton} />
      </div>

      <div className={styles.badges}>
        <div className={styles.badgeSkeleton} />
        <div className={styles.badgeSkeleton} />
        <div className={styles.badgeSkeleton} />
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

        {/* КОЛОНКА С ИНФОЙ */}
        <div className={styles.infoBlock}>
          <div className={styles.specsCard}>
            <div className={styles.cardTitleSkeleton} />
            <div className={styles.cardDividerSkeleton} />
            <div className={styles.specGrid}>
              <div className={styles.specRowSkeleton} />
              <div className={styles.specRowSkeleton} />
              <div className={styles.specRowSkeleton} />
              <div className={styles.specRowSkeleton} />
              <div className={styles.specRowSkeleton} />
            </div>
          </div>

          <div className={styles.descriptionCard}>
            <div className={styles.cardTitleSkeleton} />
            <div className={styles.cardDividerSkeleton} />
            <div className={styles.descriptionTextSkeleton}>
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLineShort} />
            </div>
          </div>

          <div className={styles.buttonSkeleton} />
        </div>
      </div>
    </>
  );
};


