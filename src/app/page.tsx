import { CarList } from "@/entities/car/ui/CarList/CarList";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.header}>
        <h1 className={styles.title}>Каталог автомобилей</h1>
      </section>

      <section>
        <CarList />
      </section>
    </>
  );
}
