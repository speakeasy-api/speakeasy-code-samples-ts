import React from "react";
import { QueryHookOptions } from "./react-query/_types.js";
import {
  CodeSamplesGetQueryData,
  useCodeSamplesGet,
} from "./react-query/codeSamplesGet.js";

export * from "./react-query/index.js";

type CodeSampleProps = {
  /**
   * The URL of the registry that you would like to fetch a code sample from. If
   * the client was provided with a registry URL, then this prop is optional.
   *
   * @example "https://spec.speakeasy.com/my-org/my-workspace/my-source"
   * */
  registryUrl?: string;

  /**
   * The `operationId` of the operation that you would like to fetch a code
   * sample for.
   *
   * @example "getPetById"
   * */
  operationId: string;

  /**
   * The language of the code sample that you would like to fetch.
   *
   * @example "typescript"
   * */
  language: string;

  queryOptions?: QueryHookOptions<CodeSamplesGetQueryData>;

  /**
   * The component to render if there is an error fetching the code sample.
   *
   * @example
   * ```tsx
   * (err: Error) => <>{err.message}</>
   * ```
   */
  error?: (err: Error) => React.ReactNode;

  /**
   * The component to render while fetching the code sample.
   *
   * @example
   * ```tsx
   * () => <>Fetching Code Sample...</>
   * ```
   */
  pending?: React.ReactNode | (() => React.ReactNode);

  /**
   * The component to render when the code sample has been successfully fetched.
   *
   * @example
   * ```tsx
   * (codeSample: string) => <pre></code>{codeSample}</code></pre>
   * ```
   */
  success?: (codeSample: string) => React.ReactNode;
};

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
 * @param {CodeSampleProps} props - The properties passed to the component.
 *
 * @returns {JSX.Element} A JSX element that displays the code sample snippet, a
 * loading message, or an error message.
 * @example
 * Usage within a component that provides code highlighting:
 *
 * ```tsx
 * import { CodeSample } from "@speakeasyapi/code-samples/react";
 * import { Code } from './components/code-highlighting';
 *
 * const ExampleComponent: React.FC = () => (
 *     <CodeSample
 *       registryUrl="https://spec.speakeasy.com/my-org/my-workspace/my-source"
 *       operationId="getPetById"
 *       language="typescript"
 *       error={(err) => <>{err.message}</>}
 *       pending={() => <>Fetching Code Sample...</>}
 *       success={(snippet) => <Code language="typescript" code={snippet} />}
 *     />
 * );
 * ```
 * */
export const CodeSample: React.FC<CodeSampleProps> = (props) => {
  const {
    error: renderError = (err: Error) => <>{err.message}</>,
    pending: renderPending = <>Fetching Code Sample...</>,
    success: renderSuccess = (codeSample: string) => <>{codeSample}</>,
    queryOptions,
    ...queryParams
  } = props;

  const { isPending, isError, error, data } = useCodeSamplesGet(
    {
      registryUrl: queryParams.registryUrl,
      operationIds: [queryParams.operationId],
      languages: [queryParams.language],
    },
    queryOptions
  );

  if (isPending) {
    return renderPending instanceof Function ? renderPending() : renderPending;
  }

  if (isError) {
    return renderError(error);
  }

  return renderSuccess(data.snippets[0]!.code);
};
