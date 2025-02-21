import React from "react";
import type { MethodPaths } from "../models/operations/getcodesamples.js";
import {
  type CodeSamplesQueryData,
  type QueryHookOptions,
} from "../react-query/index.js";
import { OperationId } from "../types/custom.js";
import { CodePlayground } from "./code-playground.js";
import { CodeSampleMethodTitle, CodeSampleTitleComponent } from "./titles.js";
import { SupportedLanguage } from "./utils.js";

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
  operation: OperationId | MethodPaths;

  className?: string;

  title?: CodeSampleTitleComponent;
};

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
  const { operation, className, title = CodeSampleMethodTitle } = props;

  return (
    <CodePlayground title={title} operation={operation} className={className} />
  );
}
