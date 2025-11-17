"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/widgets/header/ui/Header";

let queryClient: QueryClient | null = null;

function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 60_000, // 1 минута
        },
        mutations: {
          retry: 0,
        },
      },
    });
  }
  return queryClient;
}

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      <Header />
      {children}
      {/* сюда можно подключить Devtools при необходимости */}
    </QueryClientProvider>
  );
}
