/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { RequestOptions } from "../lib/sdks.js";
import { PageIterator } from "../types/operations.js";

import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export type TupleToPrefixes<T extends any[]> = T extends [...infer Prefix, any]
  ? TupleToPrefixes<Prefix> | T
  : never;

export type QueryHookOptions<Data> =
  & Omit<
    UseQueryOptions<Data, Error>,
    "queryKey" | "queryFn" | "select" | keyof RequestOptions
  >
  & RequestOptions;

export type SuspenseQueryHookOptions<Data> =
  & Omit<
    UseSuspenseQueryOptions<Data, Error>,
    "queryKey" | "queryFn" | "select" | keyof RequestOptions
  >
  & RequestOptions;

export type InfiniteQueryHookOptions<
  Data extends PageIterator<unknown, unknown>,
> =
  & Omit<
    UseInfiniteQueryOptions<
      Data,
      Error,
      InfiniteData<Data, Data["~next"]>,
      Data,
      QueryKey,
      Data["~next"]
    >,
    | "queryKey"
    | "queryFn"
    | "select"
    | "getNextPageParam"
    | "getPreviousPageParam"
    | "initialPageParam"
    | keyof RequestOptions
  >
  & RequestOptions
  & { initialPageParam?: Data["~next"] };

export type SuspenseInfiniteQueryHookOptions<
  Data extends PageIterator<unknown, unknown>,
> =
  & Omit<
    UseSuspenseInfiniteQueryOptions<
      Data,
      Error,
      InfiniteData<Data, Data["~next"]>,
      Data,
      QueryKey,
      Data["~next"]
    >,
    | "queryKey"
    | "queryFn"
    | "select"
    | "getNextPageParam"
    | "getPreviousPageParam"
    | "initialPageParam"
    | keyof RequestOptions
  >
  & RequestOptions
  & { initialPageParam?: Data["~next"] };

export type MutationHookOptions<
  Data = unknown,
  Err = Error,
  Variables = unknown,
> =
  & Omit<
    UseMutationOptions<Data, Err, Variables>,
    "mutationKey" | "mutationFn" | keyof RequestOptions
  >
  & RequestOptions;