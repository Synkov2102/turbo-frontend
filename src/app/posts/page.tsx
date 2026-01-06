"use client";

import { PostList } from "@/entities/post/ui/PostList";
import styles from "./page.module.css";
import { useState } from "react";

export default function PostsPage() {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className={styles.header}>
        <h1 className={styles.title}>Посты</h1>
      </section>

      <section>
        <PostList page={page} onPageChange={handlePageChange} limit={12} />
      </section>
    </>
  );
}



