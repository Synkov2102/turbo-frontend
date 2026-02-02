import { FC } from "react";
import styles from "../CarDetails.module.css";

interface SpecRowProps {
  label: string;
  value: string | number | null | undefined;
}

/**
 * Компонент для отображения одной характеристики автомобиля
 */
export const SpecRow: FC<SpecRowProps> = ({ label, value }) => {
  // Не показываем строку, если значение отсутствует или пустое
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return null;
  }

  return (
    <div className={styles.specRow}>
      <span className={styles.specLabel}>{label}</span>
      <span className={styles.specValue}>{value}</span>
    </div>
  );
};
