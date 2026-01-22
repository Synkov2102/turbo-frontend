export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface GetPostsFilters {
  page?: number;
  limit?: number;
}

export interface Post {
  id: string;
  title: string;
  text: string;
  images?: string[];
  createdAt: string;
  url?: string;
}

export interface RawPost {
  _id: string;
  title: string;
  text: string;
  images?: string[];
  createdAt: string;
  url?: string;
}

export function mapPost(raw: RawPost): Post {
  return {
    id: raw._id,
    title: raw.title,
    text: raw.text,
    images: raw.images,
    createdAt: raw.createdAt,
    url: raw.url,
  };
}
