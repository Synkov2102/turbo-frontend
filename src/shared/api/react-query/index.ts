import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  UseMutationResult,
  QueryKey,
} from "@tanstack/react-query";

type WithKey<TData> = UseQueryOptions<TData> & {
  queryKey: QueryKey;
};

export function useAppQuery<TData>(
  options: WithKey<TData>
): UseQueryResult<TData> {
  return useQuery<TData>({
    ...options,
  });
}

export function useAppMutation<TData, TVariables = void>(
  options: UseMutationOptions<TData, Error, TVariables>
): UseMutationResult<TData, Error, TVariables> {
  return useMutation<TData, Error, TVariables>({
    ...options,
  });
}

export const queryKeys = {
  car: {
    one: (id: string) => ["car", id] as const,
    list: (filters: unknown) => ["cars", filters] as const,
  },
  filters: {
    options: () => ["filters", "options"] as const,
    models: (brand: string | undefined) =>
      ["filters", "models", brand] as const,
  },
};
