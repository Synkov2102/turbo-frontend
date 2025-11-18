import type { Metadata } from "next";
import "./globals.css";
import { ThemeRegistry } from "./ThemeRegistry";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { PageLayout } from "@/shared/layout/page-layout/PageLayout";

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
            <PageLayout>{children}</PageLayout>
          </ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
