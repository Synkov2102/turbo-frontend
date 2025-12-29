import type { Metadata } from "next";
import "./globals.css";
import { ThemeRegistry } from "./ThemeRegistry";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { Header } from "@/widgets/header/ui/Header";
import styles from "./layout.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Каталог автомобилей | Turbo20.ru",
    template: "%s | Turbo20.ru",
  },
  description:
    "Каталог автомобилей Turbo20.ru - большой выбор автомобилей с фильтрами по марке, модели, году, цене и другим параметрам. Найдите свой идеальный автомобиль!",
  keywords: [
    "автомобили",
    "каталог автомобилей",
    "купить автомобиль",
    "продажа автомобилей",
    "авто",
    "машины",
  ],
  authors: [{ name: "Turbo20.ru" }],
  creator: "Turbo20.ru",
  publisher: "Turbo20.ru",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Turbo20.ru",
    title: "Каталог автомобилей | Turbo20.ru",
    description:
      "Каталог автомобилей Turbo20.ru - большой выбор автомобилей с фильтрами по марке, модели, году, цене и другим параметрам.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Каталог автомобилей | Turbo20.ru",
    description:
      "Каталог автомобилей Turbo20.ru - большой выбор автомобилей с фильтрами по марке, модели, году, цене и другим параметрам.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function generateWebsiteStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Turbo20.ru",
    url: siteUrl,
    description:
      "Каталог автомобилей Turbo20.ru - большой выбор автомобилей с фильтрами по марке, модели, году, цене и другим параметрам.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?brand={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteStructuredData = generateWebsiteStructuredData();

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
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
