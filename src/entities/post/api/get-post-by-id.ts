import { fetchJson } from "@/shared/api/http";
import { Post, mapPost, RawPost } from "../model/types";

/**
 * Получить пост по ID.
 */
export async function getPostById(id: string): Promise<Post> {
  const result = await fetchJson<RawPost>(`/posts/${id}`);
  const post = mapPost(result);
  // Убедимся, что id установлен
  if (!post.id) {
    post.id = id;
  }
  return post;
}

