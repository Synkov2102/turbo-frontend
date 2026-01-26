"use client";

import { FC } from "react";
import { Container } from "@mui/material";
import styles from "./CarDetailsSkeleton.module.css";
import carDetailsStyles from "./CarDetails.module.css";

export const CarDetailsSkeleton: FC = () => {
  return (
    <Container className={carDetailsStyles.root}>
      {/* Breadcrumbs skeleton */}
      <div className={styles.breadcrumbs}>
        <div className={styles.breadcrumbItem} />
        <div className={styles.breadcrumbItem} />
      </div>

      {/* Header row skeleton */}
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <div className={styles.titleSkeleton} />
          <div className={styles.titleSkeletonShort} />
        </div>
        <div className={styles.priceBlock}>
          <div className={styles.priceSkeleton} />
        </div>
      </div>

      {/* Badges skeleton */}
      <div className={styles.badges}>
        <div className={styles.badgeSkeleton} />
        <div className={styles.badgeSkeleton} />
        <div className={styles.badgeSkeleton} />
        <div className={styles.badgeSkeleton} />
      </div>

      {/* Main content skeleton */}
      <div className={styles.mainContent}>
        {/* Image column skeleton */}
        <div className={styles.imageColumn}>
          <div className={styles.mainImageSkeleton} />
          <div className={styles.thumbnailsRow}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.thumbnailSkeleton} />
            ))}
          </div>
        </div>

        {/* Info block skeleton */}
        <div className={styles.infoBlock}>
          {/* Characteristics card skeleton */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle} />
            <div className={styles.infoCardDivider} />
            <div className={styles.specGrid}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.specRow}>
                  <div className={styles.specLabelSkeleton} />
                  <div className={styles.specValueSkeleton} />
                </div>
              ))}
            </div>
          </div>

          {/* Description card skeleton */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle} />
            <div className={styles.infoCardDivider} />
            <div className={styles.descriptionSkeleton}>
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLineShort} />
            </div>
          </div>

          {/* Button skeleton */}
          <div className={styles.buttonSkeleton} />
        </div>
      </div>
    </Container>
  );
};

