const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface HttpOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>;
}

export async function fetchJson<T>(
  url: string,
  options: HttpOptions = {}
): Promise<T> {
  const { params, headers, ...rest } = options;

  const queryString =
    params &&
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(
        ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
      )
      .join("&");

  const isAbsolute = url.startsWith("http://") || url.startsWith("https://");

  const fullUrlBase = isAbsolute ? url : `${BASE_URL}${url}`;
  const fullUrl = queryString ? `${fullUrlBase}?${queryString}` : fullUrlBase;

  const response = await fetch(fullUrl, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Request failed: ${response.status} ${response.statusText} — ${text}`
    );
  }

  return response.json();
}
