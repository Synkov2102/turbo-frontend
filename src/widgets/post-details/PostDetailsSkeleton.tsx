"use client";

import { FC } from "react";
import { Container } from "@mui/material";
import styles from "./PostDetailsSkeleton.module.css";
import postDetailsStyles from "./PostDetails.module.css";

export const PostDetailsSkeleton: FC = () => {
  return (
    <Container className={postDetailsStyles.root}>
      {/* Breadcrumbs skeleton */}
      <div className={styles.breadcrumbs}>
        <div className={styles.breadcrumbItem} />
        <div className={styles.breadcrumbItem} />
        <div className={styles.breadcrumbItem} />
      </div>

      {/* Header row skeleton */}
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <div className={styles.titleSkeleton} />
          <div className={styles.titleSkeletonShort} />
        </div>
      </div>

      {/* Badges skeleton */}
      <div className={styles.badges}>
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
          {/* Text card skeleton */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle} />
            <div className={styles.infoCardDivider} />
            <div className={styles.textSkeleton}>
              <div className={styles.textLine} />
              <div className={styles.textLine} />
              <div className={styles.textLine} />
              <div className={styles.textLineShort} />
            </div>
          </div>

          {/* Button skeleton */}
          <div className={styles.buttonSkeleton} />
        </div>
      </div>
    </Container>
  );
};
