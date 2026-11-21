# CodeSamples

## Overview

### Available Operations

* [get](#get) - Retrieve usage snippets

## get

Retrieve usage snippets from an OpenAPI document stored in the registry. Supports filtering by language and operation ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getCodeSamples" method="get" path="/v1/code_sample" example="default" -->
```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    operationIds: [
      "getPets",
    ],
    methodPaths: [
      {
        method: "get",
        path: "/pets",
      },
    ],
    languages: [
      "python",
      "javascript",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SpeakeasyCodeSamplesCore } from "@speakeasyapi/code-samples/core.js";
import { codeSamplesGet } from "@speakeasyapi/code-samples/funcs/codeSamplesGet.js";

// Use `SpeakeasyCodeSamplesCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const speakeasyCodeSamples = new SpeakeasyCodeSamplesCore({
  registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await codeSamplesGet(speakeasyCodeSamples, {
    operationIds: [
      "getPets",
    ],
    methodPaths: [
      {
        method: "get",
        path: "/pets",
      },
    ],
    languages: [
      "python",
      "javascript",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("codeSamplesGet failed:", res.error);
  }
}

run();
```

### React hooks and utilities

This method can be used in React components through the following hooks and
associated utilities.

> Check out [this guide][hook-guide] for information about each of the utilities
> below and how to get started using React hooks.

[hook-guide]: ../../../REACT_QUERY.md

```tsx
import {
  // Query hooks for fetching data.
  useCodeSamples,
  useCodeSamplesSuspense,

  // Utility for prefetching data during server-side rendering and in React
  // Server Components that will be immediately available to client components
  // using the hooks.
  prefetchCodeSamples,
  
  // Utilities to invalidate the query cache for this query in response to
  // mutations and other user actions.
  invalidateCodeSamples,
  invalidateAllCodeSamples,
} from "@speakeasyapi/code-samples/react-query/codeSamplesGet.js";
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetCodeSamplesRequest](../../models/operations/getcodesamplesrequest.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.UsageSnippets](../../models/components/usagesnippets.md)\>**

### Errors

| Error Type       | Status Code      | Content Type     |
| ---------------- | ---------------- | ---------------- |
| errors.ErrorT    | 4XX              | application/json |
| errors.APIError  | 5XX              | \*/\*            |