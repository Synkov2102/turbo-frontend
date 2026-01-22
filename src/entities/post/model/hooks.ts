"use client";

import { Post, PaginatedResponse, GetPostsFilters } from "./types";
import { getPosts } from "@/entities/post/api/get-posts";
import { queryKeys, useAppQuery } from "@/shared/api/react-query";

export function usePosts(filters: GetPostsFilters = {}) {
  return useAppQuery<PaginatedResponse<Post>>({
    queryKey: queryKeys.post.list(filters),
    queryFn: () => getPosts(filters),
  });
}
