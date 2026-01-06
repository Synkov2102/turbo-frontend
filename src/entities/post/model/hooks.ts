"use client";

import { PaginatedResponse, Post, GetPostsFilters } from "./types";
import { getPosts } from "../api/get-posts";
import { getPostById } from "../api/get-post-by-id";
import { queryKeys, useAppQuery } from "@/shared/api/react-query";

export function usePosts(filters: GetPostsFilters = {}) {
  return useAppQuery<PaginatedResponse<Post>>({
    queryKey: queryKeys.post.list(filters),
    queryFn: () => getPosts(filters),
  });
}

export function usePost(id: string) {
  return useAppQuery<Post>({
    queryKey: queryKeys.post.detail(id),
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
}

