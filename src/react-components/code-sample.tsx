import { beta, SupportedLanguage } from "@speakeasy-api/moonshine";
import "@speakeasy-api/moonshine/moonshine.css";
import React from "react";
import { clsx } from "../lib/clsx.js";
import { HttpMethod } from "../models/components/httpmethod.js";
import type { GetCodeSamplesRequest } from "../models/operations/getcodesamples.js";
import {
  useCodeSamples,
  type CodeSamplesQueryData,
  type QueryHookOptions,
} from "../react-query/index.js";
import { OneOf } from "../types/custom.js";

export type { SupportedLanguage };

const { CodePlayground } = beta;

type CodePlaygroundProps = React.ComponentProps<typeof beta.CodePlayground>;

type CodeSampleProps = {
  /**
   * The color mode for the code playground.
   * - '': Forces dark mode
   * - 'light': Forces light mode
   * - 'system': Follows system preferences
   * @default 'system'
   */
  mode?: "light" | "dark" | "system";
  /**
   * The URL of the registry that you would like to fetch a code sample from. If
   * the client was provided with a registry URL, then this prop is optional.
   * */
  registryUrl?: string;

  /**
   * The language of the code sample that you would like to fetch. If no language
   * is provided, then all languages will be displayed.
   * */
  languages?: SupportedLanguage[];

  /** The options for the TanStack query that fetches the code snippet. */
  queryOptions?: QueryHookOptions<CodeSamplesQueryData>;

  /** The component to render if there is an error fetching the code sample. */
  error?: (err: Error) => React.ReactNode;

  /** The component to render while fetching the code sample. */
  pending?: React.ReactNode | (() => React.ReactNode);

  /** The operation to get a code sample for. Can be queried by either operationId or method+path. */
  operation: OneOf<
    [{ operationId: string }, { method: HttpMethod; path: string }]
  >;
} & Omit<CodePlaygroundProps, "snippets">;

/**
 *
 * React component that fetches and displays a code sample snippet from the
 * Speakeasy Code Samples API. It uses a Speakeasy-generated React Query
 * retrieve the code sample base on the provided props.
 *
 * __**IMPORTANT:**  This component must be rendered within a structure wrapped
 * by both `QueryClientProvider` and `SpeakeasyCodeSamplesProvider`. This
 * ensures that the necessary context and query client are properly initialized
 * for the component to function.__
 *
 * **Slot Methods:**
 * - `error`: Renders a fallback UI when there is an error fetching the code
 *   sample.
 * - `pending`: Renders a loading indicator while the code sample is being
 *   fetched.
 *
 * @example
 * Fetch a code samples by operationId:
 * ```tsx
 * import { CodeSample } from "@speakeasyapi/code-samples/react/code-sample";
 *
 * const ExampleComponent: React.FC = () => (
 *   <CodeSample
 *     languages=["typescript", "go"]
 *     operation={{ operationId: "getPetById" }}
 *     error={(err) => <>{err.message}</>}
 *     pending={() => <>Fetching Code Sample...</>}
 *   />
 * );
 * ```
 *
 * Fetch a code sample by method and path:
 * ```tsx
 * import { CodeSample } from "@speakeasyapi/code-samples/react/code-sample";
 *
 * const ExampleComponent: React.FC = () => (
 *   <CodeSample
 *     language="typescript"
       operation={{ method: "get", path: "/pet/{id}" }}
 *     error={(err) => <>{err.message}</>}
 *     pending={() => <>Fetching Code Sample...</>}
 *   />
 * );
 * ```
 */
export function CodeSample(props: CodeSampleProps): React.ReactNode {
  const {
    error: renderError = (err: Error) => <>{err.message}</>,
    pending: renderPending = <>Fetching Code Sample...</>,
    registryUrl,
    queryOptions,
    languages,
    operation,
    mode = "light",
    className,
    ...codePlaygroundProps
  } = props;

  const query: GetCodeSamplesRequest = {
    registryUrl,
    languages: languages,
  };

  if (operation.method && operation.path) {
    query.methodPaths = [{ ...operation }];
  } else if (operation.operationId) {
    query.operationIds = [operation.operationId];
  } else {
    throw new Error(
      "You must provide either an operationId or a method and path to fetch a code sample.",
    );
  }

  const { isPending, isError, error, data } = useCodeSamples(
    query,
    queryOptions,
  );

  if (isPending) {
    return renderPending instanceof Function ? renderPending() : renderPending;
  }

  if (isError) {
    return renderError(error);
  }

  const snippetMap = data.snippets.reduce(
    (acc, snippet) => {
      acc[snippet.language as SupportedLanguage] = snippet.code;
      return acc;
    },
    {} as React.ComponentProps<typeof CodePlayground>["snippets"],
  );

  let systemColor = "light";
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    systemColor = "dark";
  }

  return (
    <CodePlayground
      {...codePlaygroundProps}
      className={clsx(
        mode === "system" && systemColor,
        mode,
        className as string,
      )}
      snippets={snippetMap}
    />
  );
}
