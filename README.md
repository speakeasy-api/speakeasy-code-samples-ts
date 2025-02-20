<div align="center">
 <a href="https://www.speakeasy.com/" target="_blank">
   <picture>
       <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/21dd5d3a-aefc-4cd3-abee-5e17ef1d4dad">
       <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/0a747f98-d228-462d-9964-fd87bf93adc5">
       <img width="100px" src="https://github.com/user-attachments/assets/21dd5d3a-aefc-4cd3-abee-5e17ef1d4dad#gh-light-mode-only" alt="Speakeasy">
   </picture>
 </a>
  <h1>Speakeasy</h1>
  <p>Build APIs your users love ❤️ with Speakeasy</p>
  <div>
   <a href="https://speakeasy.com/docs/create-client-sdks/" target="_blank"><b>Docs Quickstart</b></a>&nbsp;&nbsp;//&nbsp;&nbsp;<a href="https://join.slack.com/t/speakeasy-dev/shared_invite/zt-1cwb3flxz-lS5SyZxAsF_3NOq5xc8Cjw" target="_blank"><b>Join us on Slack</b></a>
  </div>
 <br />

</div>

> [!IMPORTANT]
> This SDK is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/speakeasy-self/speakeasy-self). Delete this section before > publishing to a package manager.

<div align="center">
  <img src="https://github.com/user-attachments/assets/f5ab386f-39bb-4ae2-aa0d-54e2f95b656d" alt="Description" width="750"/>
  <p><em>CodeSamples React Component in Action</em></p>
</div>

<!-- Start Summary [summary] -->
## Summary

Speakeasy Code Samples API: REST APIs for retrieving SDK usage snippets from the Speakeasy Code Samples API.

For more information about the API: [The Speakeasy Platform Documentation](/docs)
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [@speakeasyapi/code-samples](#speakeasyapicode-samples)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [React hooks with TanStack Query](#react-hooks-with-tanstack-query)
  * [Global Parameters](#global-parameters)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add @speakeasyapi/code-samples
# Install optional peer dependencies if you plan to use React hooks
npm add @tanstack/react-query react react-dom
```

### PNPM

```bash
pnpm add @speakeasyapi/code-samples
# Install optional peer dependencies if you plan to use React hooks
pnpm add @tanstack/react-query react react-dom
```

### Bun

```bash
bun add @speakeasyapi/code-samples
# Install optional peer dependencies if you plan to use React hooks
bun add @tanstack/react-query react react-dom
```

### Yarn

```bash
yarn add @speakeasyapi/code-samples zod
# Install optional peer dependencies if you plan to use React hooks
yarn add @tanstack/react-query react react-dom

# Note that Yarn does not install peer dependencies automatically. You will need
# to install zod as shown above.
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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

  // Handle the result
  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->

### React Component

This library includes a React component that fetches and highlights code
snippets using `highlight.js`. Along with displaying the snippet, it shows a
loading state during fetching and provides a fallback view if an error occurs.

```tsx
import { SpeakeasyCodeSamplesCore } from "@speakeasyapi/code-samples/core";
import {
  CodeSample,
  SpeakeasyCodeSamplesProvider,
} from "@speakeasyapi/code-samples/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const speakeasyCodeSamples = new SpeakeasyCodeSamplesCore({
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

// Retries are handled by the underlying SDK.
queryClient.setQueryDefaults(["@speakeasyapi/code-samples"], { retry: false });

queryClient.setMutationDefaults(["@speakeasyapi/code-samples"], {
  retry: false,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SpeakeasyCodeSamplesProvider client={speakeasyCodeSamples}>
        <CodeSample operationId="getPetById" language="typescript" />
      </SpeakeasyCodeSamplesProvider>
    </QueryClientProvider>
  );
}
```

> [!NOTE]
> To apply styles to the highlighted code, import a `highlight.js` theme CSS
> file into your project using methods like a `<link>` tag.

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name     | Type   | Scheme  |
| -------- | ------ | ------- |
| `apiKey` | apiKey | API key |

To authenticate with the API the `apiKey` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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

  // Handle the result
  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [codeSamples](docs/sdks/codesamples/README.md)

* [get](docs/sdks/codesamples/README.md#get) - Retrieve usage snippets


</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`codeSamplesGet`](docs/sdks/codesamples/README.md#get) - Retrieve usage snippets

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start React hooks with TanStack Query [react-query] -->
## React hooks with TanStack Query

React hooks built on [TanStack Query][tanstack-query] are included in this SDK.
These hooks and the utility functions provided alongside them can be used to
build rich applications that pull data from the API using one of the most
popular asynchronous state management library.

[tanstack-query]: https://tanstack.com/query/v5/docs/framework/react/overview

To learn about this feature and how to get started, check
[REACT_QUERY.md](./REACT_QUERY.md).

> [!WARNING]
>
> This feature is currently in **preview** and is subject to breaking changes
> within the current major version of the SDK as we gather user feedback on it.

<details>

<summary>Available React hooks</summary>

- [`useCodeSamples`](docs/sdks/codesamples/README.md#get) - Retrieve usage snippets

</details>
<!-- End React hooks with TanStack Query [react-query] -->

<!-- Start Global Parameters [global-parameters] -->
## Global Parameters

A parameter is configured globally. This parameter may be set on the SDK client instance itself during initialization. When configured as an option during SDK initialization, This global value will be used as the default on the operations that use it. When such operations are called, there is a place in each to override the global value, if needed.

For example, you can set `registry_url` to `"https://spec.speakeasy.com/org/ws/my-source"` at SDK initialization and then you do not have to pass the same value on calls to operations like `get`. But if you want to do so you may, which will locally override the global setting. See the example code below for a demonstration.


### Available Globals

The following global parameter is available.

| Name        | Type   | Description                                           |
| ----------- | ------ | ----------------------------------------------------- |
| registryUrl | string | The registry URL from which to retrieve the snippets. |

### Example

```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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

  // Handle the result
  console.log(result);
}

run();

```
<!-- End Global Parameters [global-parameters] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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
  }, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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

  // Handle the result
  console.log(result);
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

Some methods specify known errors which can be thrown. All the known errors are enumerated in the `models/errors/errors.ts` module. The known errors for a method are documented under the *Errors* tables in SDK docs. For example, the `get` method may throw the following errors:

| Error Type      | Status Code | Content Type     |
| --------------- | ----------- | ---------------- |
| errors.ErrorT   | 4XX         | application/json |
| errors.APIError | 5XX         | \*/\*            |

If the method throws an error and it is not captured by the known errors, it will default to throwing a `APIError`.

```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";
import {
  ErrorT,
  SDKValidationError,
} from "@speakeasyapi/code-samples/models/errors";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  let result;
  try {
    result = await speakeasyCodeSamples.codeSamples.get({
      registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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

    // Handle the result
    console.log(result);
  } catch (err) {
    switch (true) {
      // The server response does not match the expected SDK schema
      case (err instanceof SDKValidationError): {
        // Pretty-print will provide a human-readable multi-line error message
        console.error(err.pretty());
        // Raw value may also be inspected
        console.error(err.rawValue);
        return;
      }
      case (err instanceof ErrorT): {
        // Handle err.data$: ErrorTData
        console.error(err);
        return;
      }
      default: {
        // Other errors such as network errors, see HTTPClientErrors for more details
        throw err;
      }
    }
  }
}

run();

```

Validation errors can also occur when either method arguments or data returned from the server do not match the expected format. The `SDKValidationError` that is thrown as a result will capture the raw value that failed validation in an attribute called `rawValue`. Additionally, a `pretty()` method is available on this error that can be used to log a nicely formatted multi-line string since validation errors can list many issues and the plain error string may be difficult read when debugging.

In some rare cases, the SDK can fail to get a response from the server or even make the request due to unexpected circumstances such as network conditions. These types of errors are captured in the `models/errors/httpclienterrors.ts` module:

| HTTP Client Error                                    | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- |
| RequestAbortedError                                  | HTTP request was aborted by the client               |
| RequestTimeoutError                                  | HTTP request timed out due to an AbortSignal signal  |
| ConnectionError                                      | HTTP client was unable to make a request to a server |
| InvalidRequestError                                  | Any input used to create a request is invalid        |
| UnexpectedClientError                                | Unrecognised or unexpected error                     |
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Select Server by Name

You can override the default server globally by passing a server name to the `server: keyof typeof ServerList` optional parameter when initializing the SDK client instance. The selected server will then be used as the default on the operations that use it. This table lists the names associated with the available servers:

| Name   | Server                              |
| ------ | ----------------------------------- |
| `prod` | `https://api.prod.speakeasyapi.dev` |

#### Example

```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  server: "prod",
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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

  // Handle the result
  console.log(result);
}

run();

```

### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  serverURL: "https://api.prod.speakeasyapi.dev",
  apiKey: "<YOUR_API_KEY_HERE>",
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
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

  // Handle the result
  console.log(result);
}

run();

```
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";
import { HTTPClient } from "@speakeasyapi/code-samples/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new SpeakeasyCodeSamples({ httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const sdk = new SpeakeasyCodeSamples({ debugLogger: console });
```
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation.
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release.

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=@speakeasyapi/code-samples&utm_campaign=typescript)
