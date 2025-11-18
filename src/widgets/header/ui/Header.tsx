"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/shared/assets/logo.svg";
import styles from "./Header.module.css";

export function Header() {
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
        </Link>
      </div>
    </header>
  );
}
