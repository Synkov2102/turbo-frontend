import { fetchJson } from "@/shared/api/http";
import { Post, RawPost, mapPost } from "@/entities/post/model/types";

/**
 * Получить один пост по id.
 */
export async function getPostById(id: string): Promise<Post> {
  const result = await fetchJson<RawPost>(`/posts/${id}`);
  return mapPost(result);
}
