"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/shared/assets/logo.svg";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Каталог" },
    { href: "/posts", label: "Посты" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoWrapper}>
          <Image
            src={logo}
            alt="Logo"
            height={40}
            className={styles.logo}
            priority
          />
          <p>123</p>
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
