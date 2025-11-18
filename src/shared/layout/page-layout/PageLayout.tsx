import { ReactNode } from "react";

import styles from "./PageLayout.module.css";
import { Header } from "@/widgets/header/ui/Header";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={`${styles.main} ${className ?? ""}`}>
        <div className={styles.inner}>{children}</div>
      </main>
    </div>
  );
}
