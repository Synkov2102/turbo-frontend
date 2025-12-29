"use client";

import { FC } from "react";
import styles from "./CarCardSkeleton.module.css";

export const CarCardSkeleton: FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageSkeleton} />
      </div>
      <div className={styles.content}>
        <div className={styles.titleSkeleton} />
        <div className={styles.footer}>
          <div className={styles.priceSkeleton} />
          <div className={styles.citySkeleton} />
        </div>
      </div>
    </div>
  );
};


