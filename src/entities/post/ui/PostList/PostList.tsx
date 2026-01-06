"use client";

import { FC } from "react";
import styles from "./PostList.module.css";
import { PostCard } from "../PostCard";
import { GetPostsFilters } from "@/entities/post/model/types";
import { usePosts } from "@/entities/post/model/hooks";
import { Pagination } from "@/shared/ui/pagination";

interface PostListProps {
  filters?: GetPostsFilters;
  page?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
}

export const PostList: FC<PostListProps> = ({
  filters = {},
  page = 1,
  onPageChange,
  limit = 10,
}) => {
  const { data, isLoading, error } = usePosts({ ...filters, page, limit });

  if (isLoading) {
    return <div className={styles.state}>Загрузка постов...</div>;
  }

  if (error) {
    return (
      <div className={styles.state}>
        Ошибка загрузки: {(error as Error).message}
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return <div className={styles.state}>Посты не найдены</div>;
  }

  const startItem = (data.meta.page - 1) * data.meta.limit + 1;
  const endItem = Math.min(data.meta.page * data.meta.limit, data.meta.total);

  return (
    <>
      {data.meta.total > 0 && (
        <div className={styles.info}>
          Показано {startItem}-{endItem} из {data.meta.total}
        </div>
      )}
      <div className={styles.grid}>
        {data.data.map((post, index) => (
          <PostCard
            key={post.id || `${post.createdAt}-${index}`}
            post={post}
          />
        ))}
      </div>
      {onPageChange && (
        <Pagination
          page={page}
          totalPages={data.meta.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};


