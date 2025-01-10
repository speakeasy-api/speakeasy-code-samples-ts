"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakeasyCodeSample = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const codeSamplesGet_1 = require("./react-query/codeSamplesGet");
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
const SpeakeasyCodeSample = (props) => {
    const { renderError = (err) => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: err.message }), renderPending = () => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Fetching Code Sample..." }), renderSuccess = (codeSample) => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: codeSample }), ...queryParams } = props;
    const { isPending, isError, error, data } = (0, codeSamplesGet_1.useCodeSamplesGet)({
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
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: data.snippets[0]?.code ?? "No code snippet found." });
};
exports.SpeakeasyCodeSample = SpeakeasyCodeSample;
//# sourceMappingURL=react.js.map