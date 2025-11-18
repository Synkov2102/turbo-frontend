"use client";

import { FC, ReactNode } from "react";
import { Typography, Divider } from "@mui/material";

import styles from "./InfoCard.module.css";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export const InfoCard: FC<InfoCardProps> = ({
  title,
  children,
  className,
  bodyClassName,
}) => {
  return (
    <section className={`${styles.card} ${className ?? ""}`}>
      <Typography variant="subtitle1" className={styles.title}>
        {title}
      </Typography>
      <Divider className={styles.divider} />
      <div className={bodyClassName}>{children}</div>
    </section>
  );
};
