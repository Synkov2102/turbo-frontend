import type { Metadata } from "next";
import "./globals.css";
import { ThemeRegistry } from "./ThemeRegistry";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { Header } from "@/widgets/header/ui/Header";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js + FSD + React Query",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <ReactQueryProvider>
            <div className={styles.layout}>
              <Header />
              <main className={styles.main}>
                <div className={styles.inner}>{children}</div>
              </main>
            </div>
          </ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
