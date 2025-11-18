"use client";

import { FC } from "react";
import Link from "next/link";
import { Breadcrumbs as MuiBreadCrumbs, Typography } from "@mui/material";

import styles from "./Breadcrumbs.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className }) => {
  if (!items.length) return null;

  const lastIndex = items.length - 1;

  return (
    <nav
      className={`${styles.root} ${className ?? ""}`}
      aria-label="breadcrumbs"
    >
      <MuiBreadCrumbs aria-label="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === lastIndex;

          if (isLast || !item.href) {
            return (
              <Typography
                key={item.label + index}
                variant="body2"
                color="text.primary"
                className={styles.item}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={item.label + index}
              href={item.href}
              className={styles.link}
            >
              {item.label}
            </Link>
          );
        })}
      </MuiBreadCrumbs>
    </nav>
  );
};
