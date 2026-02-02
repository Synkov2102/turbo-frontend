import { FC } from "react";
import Image from "next/image";
import styles from "../CarList.module.css";
import logo from "@/shared/assets/logo.svg";
import { TwemojiText } from "@/shared/ui/twemoji";

/**
 * Компонент для отображения ошибки загрузки каталога автомобилей
 */
export const CarListError: FC = () => {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorContent}>
        <div className={styles.errorLogo}>
          <Image
            src={logo}
            alt="Логотип"
            width={120}
            height={120}
            priority
          />
        </div>
        <div className={styles.errorText}>
          <TwemojiText as="h2" className={styles.errorTitle}>
            Произошла ошибка 😢
          </TwemojiText>
          <p className={styles.errorHint}>
            Пожалуйста, попробуйте обновить страницу или вернитесь позже
          </p>
        </div>
      </div>
    </div>
  );
};
