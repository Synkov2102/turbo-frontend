"use client";

import { Post, PaginatedResponse, GetPostsFilters } from "./types";
import { getPosts } from "@/entities/post/api/get-posts";
import { getPostById } from "@/entities/post/api/get-post-by-id";
import { queryKeys, useAppQuery } from "@/shared/api/react-query";

export function usePosts(filters: GetPostsFilters = {}) {
  return useAppQuery<PaginatedResponse<Post>>({
    queryKey: queryKeys.post.list(filters),
    queryFn: () => getPosts(filters),
  });
}

export function usePost(id: string) {
  return useAppQuery<Post>({
    queryKey: queryKeys.post.one(id),
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
}
