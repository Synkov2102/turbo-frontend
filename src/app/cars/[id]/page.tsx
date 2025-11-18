import { CarDetails } from "@/widgets/car-details/CarDetails";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  return <CarDetails carId={id} />;
}
