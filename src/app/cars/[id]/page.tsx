import { CarDetails } from "@/widgets/car-details/CarDetails";
import { getCarById } from "@/entities/car/api/get-car-by-id";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Car } from "@/entities/car/model/types";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

function generateStructuredData(car: Car) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const carUrl = `${siteUrl}/cars/${car.id}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: car.title,
    description: car.description || car.title,
    image: car.images || [],
    url: carUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: car.price?.RUB?.toString() || car.price?.USD?.toString() || car.price?.EUR?.toString() || "0",
      availability: car.status === "active" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: car.url || carUrl,
    },
    ...(car.brand && {
      brand: {
        "@type": "Brand",
        name: car.brand,
      },
    }),
    ...(car.model && {
      model: car.model,
    }),
    ...(car.year && {
      productionDate: car.year.toString(),
    }),
    ...((car.location?.city || car.city) && {
      areaServed: {
        "@type": "City",
        name: car.location?.city || car.city,
        ...(car.location?.country && {
          containedIn: {
            "@type": "Country",
            name: car.location.country,
          },
        }),
      },
    }),
  };

  return structuredData;
}

export async function generateMetadata({
  params,
}: CarPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const car = await getCarById(id);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const carUrl = `${siteUrl}/cars/${id}`;
    const imageUrl = car.images?.[0] || `${siteUrl}/logo.svg`;

    const priceText = car.price?.RUB
      ? `${car.price.RUB.toLocaleString("ru-RU")} ₽`
      : car.price?.USD
        ? `${car.price.USD.toLocaleString("ru-RU")} $`
        : car.price?.EUR
          ? `${car.price.EUR.toLocaleString("ru-RU")} €`
          : "";

    const locationText = car.location?.city
      ? `${car.location.city}${car.location.country ? `, ${car.location.country}` : ""}`
      : car.city || "";

    const description = `${car.title}${car.year ? ` ${car.year} года` : ""}${priceText ? `. Цена: ${priceText}` : ""}${locationText ? `. Локация: ${locationText}` : ""}${car.mileage ? `. Пробег: ${car.mileage.toLocaleString("ru-RU")} км` : ""}. ${car.description ? car.description.slice(0, 100) + "..." : ""}`;

    return {
      title: car.title,
      description: description.slice(0, 160),
      openGraph: {
        title: car.title,
        description: description.slice(0, 160),
        url: carUrl,
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: car.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: car.title,
        description: description.slice(0, 160),
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Автомобиль не найден",
      description: "Автомобиль не найден",
    };
  }
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  let car: Car;
  try {
    car = await getCarById(id);
  } catch (error) {
    notFound();
  }

  const structuredData = generateStructuredData(car);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CarDetails carId={id} />
    </>
  );
}
