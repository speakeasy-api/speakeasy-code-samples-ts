import React from "react";
import { useCodeSamplesGet } from "./react-query/codeSamplesGet";

type SpeakeasyCodeSampleProps = {
  /**
   * The URL of the registry that you would like to fetch a code sample from.
   *
   * @example "https://spec.speakeasy.com/my-org/my-workspace/my-source"
   */
  registryUrl: string;
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

  renderError?: (err: Error) => React.ReactNode;
  renderPending?: () => React.ReactNode;
  renderSuccess?: (codeSample: string) => React.ReactNode;
};

/**
 * SpeakeasyCodeSample is a React component that fetches and displays a code
 * sample snippet from the Speakeasy Code Samples API. It uses the
 * `useCodeSamplesGet` hook to retrieve the code sample based on the provided
 * props.
 *
 * @param {SpeakeasyCodeSampleProps} props - The properties passed to the component.
 * @param {string} props.registryUrl - The URL of the code sample registry.
 * @param {string} props.operationId - The operation ID for which the code sample is requested.
 * @param {string} props.language - The programming language of the code sample.
 *
 * @returns {JSX.Element} A JSX element that displays the code sample snippet, a loading message, or an error message.
 *
 * @example
 * Usage within a component that provides code highlighting:
 *
 * ```tsx
 * import { SpeakeasyCodeSample } from "@speakeasyapi/react";
 * import { Code } from './components/code-highlighting';
 *
 * const ExampleComponent: React.FC = () => (
 *   <Code language="typescript">
 *     <SpeakeasyCodeSample
 *       registryUrl="https://spec.speakeasy.com/my-org/my-workspace/my-source"
 *       operationId="getPetById"
 *       language="typescript"
 *     />
 *   </Code>
 * );
 * ```
 */
export const SpeakeasyCodeSample: React.FC<SpeakeasyCodeSampleProps> = (
  props
) => {
  const {
    renderError = (err: Error) => <>{err.message}</>,
    renderPending = () => <>Fetching Code Sample...</>,
    renderSuccess = (codeSample: string) => <>{codeSample}</>,
    ...queryParams
  } = props;

  const { isPending, isError, error, data } = useCodeSamplesGet({
    registryUrl: queryParams.registryUrl,
    operationIds: [queryParams.operationId],
    languages: [queryParams.language],
  });

  if (isPending) {
    return renderPending();
  }

  if (isError) {
    return renderError(error);
  }

  return <>{data.snippets[0]?.code ?? "No code snippet found."}</>;
};
