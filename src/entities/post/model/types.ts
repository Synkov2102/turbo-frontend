export interface Post {
  id?: string;
  title: string;
  text: string;
  images?: string[];
  url?: string;
  createdAt: string;
}

export interface RawPost {
  _id?: string;
  id?: string;
  title: string;
  text: string;
  images?: string[];
  url?: string;
  createdAt: string;
}

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

export function mapPost(raw: RawPost): Post {
  return {
    ...raw,
    id: raw.id || raw._id,
  };
}


