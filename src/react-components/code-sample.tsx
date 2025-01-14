import React from "react";
import {
  useCodeSamplesGet,
  type CodeSamplesGetQueryData,
  type QueryHookOptions,
} from "../react-query/index.js";
import { Highlight, type HighlightLanguage as Language } from "./highlight.js";

type CodeSampleProps = {
  /**
   * The URL of the registry that you would like to fetch a code sample from. If
   * the client was provided with a registry URL, then this prop is optional.
   * */
  registryUrl?: string;

  /**
   * The `operationId` of the operation that you would like to fetch a code
   * sample for.
   * */
  operationId: string;

  /** The language of the code sample that you would like to fetch. */
  language: Language;

  queryOptions?: QueryHookOptions<CodeSamplesGetQueryData>;

  /** The component to render if there is an error fetching the code sample. */
  error?: (err: Error) => React.ReactNode;

  /** The component to render while fetching the code sample. */
  pending?: React.ReactNode | (() => React.ReactNode);
} & JSX.IntrinsicElements["pre"];

/**
 * React component that fetches and displays a code sample snippet from the
 * Speakeasy Code Samples API. It uses a Speakeasy-generated React Query to
 * retrieve the code sample based on the provided props.
 *
 * __**IMPORTANT:**  This component must be rendered within a structure wrapped
 * by both `QueryClientProvider` and `SpeakeasyCodeSamplesProvider`. This
 * ensures that the necessary context and query client are properly initialized
 * for the component to function.__
 *
 * This component uses highlight.js for rendering code samples with syntax
 * highlighting. To apply styles to the highlighted code, import a highlight.js
 * theme CSS file into your project using methods like a `<link>` tag.
 *
 * **Slot Methods:**
 * - `error`: Renders a fallback UI when there is an error fetching the code
 *   sample.
 * - `pending`: Renders a loading indicator while the code sample is being
 *   fetched.
 *
 * @example
 * Usage within a component that provides code highlighting:
 *
 * ```tsx
 * import { CodeSample } from "@speakeasyapi/code-samples/react/code-sample";
 * import { Highlight } from "@speakeasyapi/code-samples/react/highlight";
 *
 * const ExampleComponent: React.FC = () => (
 *     <CodeSample
 *       registryUrl="https://spec.speakeasy.com/my-org/my-workspace/my-source"
 *       operationId="getPetById"
 *       language="typescript"
 *       error={(err) => <>{err.message}</>}
 *       pending={() => <>Fetching Code Sample...</>}
 *     />
 * );
 * ```
 */
export const CodeSample: React.FC<CodeSampleProps> = (props) => {
  const {
    error: renderError = (err: Error) => <>{err.message}</>,
    pending: renderPending = <>Fetching Code Sample...</>,
    registryUrl,
    queryOptions,
    language,
    operationId,
    ...restProps
  } = props;

  const { isPending, isError, error, data } = useCodeSamplesGet(
    {
      registryUrl: registryUrl,
      operationIds: [operationId],
      languages: [language],
    },
    queryOptions
  );

  if (isPending) {
    return renderPending instanceof Function ? renderPending() : renderPending;
  }

  if (isError) {
    return renderError(error);
  }

  return (
    <Highlight
      code={data.snippets[0]!.code}
      language={props.language}
      {...restProps}
    />
  );
};
