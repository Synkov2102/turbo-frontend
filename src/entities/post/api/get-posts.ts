import { fetchJson } from "@/shared/api/http";
import {
  Post,
  mapPost,
  RawPost,
  PaginatedResponse,
  PaginationMeta,
  GetPostsFilters,
} from "@/entities/post/model/types";

interface RawPaginatedResponse {
  data: RawPost[];
  meta: PaginationMeta;
}

/**
 * Получить список постов с пагинацией.
 */
export async function getPosts(
  filters: GetPostsFilters = {}
): Promise<PaginatedResponse<Post>> {
  const result = await fetchJson<RawPaginatedResponse>("/posts", {
    params: {
      page: filters.page,
      limit: filters.limit,
    },
  });

  return {
    data: result.data.map(mapPost),
    meta: result.meta,
  };
}
