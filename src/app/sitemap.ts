import { MetadataRoute } from "next";
import { getCars } from "@/entities/car/api/get-cars";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Главная страница
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  try {
    // Получаем все автомобили для sitemap
    // Используем большой limit, чтобы получить максимум машин
    const carsData = await getCars({ limit: 1000, page: 1 });

    // Добавляем страницы автомобилей
    for (const car of carsData.data) {
      routes.push({
        url: `${siteUrl}/cars/${car.id}`,
        lastModified: car.createdAt ? new Date(car.createdAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Если есть больше страниц, получаем их тоже
    if (carsData.meta.totalPages > 1) {
      for (let page = 2; page <= Math.min(carsData.meta.totalPages, 10); page++) {
        const pageData = await getCars({ limit: 1000, page });
        for (const car of pageData.data) {
          routes.push({
            url: `${siteUrl}/cars/${car.id}`,
            lastModified: car.createdAt ? new Date(car.createdAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}


