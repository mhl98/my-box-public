import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export const QueryKeys = {
  GET_HOTEL_LIST: "hotelList",
};

export type QueryOption<TData, TError = unknown> = Omit<
  UseQueryOptions<TData, TError, TData, any>,
  "initialData" | "queryKey"
> & {
  initialData?: () => undefined;
};

export type MutationOption<TData, TVariables> = Omit<
  UseMutationOptions<TData, any, TVariables, any>,
  "mutationFn"
>;
