# GetCodeSamplesRequest

## Example Usage

```typescript
import { GetCodeSamplesRequest } from "@speakeasyapi/code-samples/models/operations";

let value: GetCodeSamplesRequest = {
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
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
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `registryUrl`                                                      | *string*                                                           | :heavy_minus_sign:                                                 | The registry URL from which to retrieve the snippets.              | https://spec.speakeasy.com/org/ws/my-source                        |
| `operationIds`                                                     | *string*[]                                                         | :heavy_minus_sign:                                                 | The operation IDs to retrieve snippets for.                        | getPets                                                            |
| `methodPaths`                                                      | [operations.MethodPaths](../../models/operations/methodpaths.md)[] | :heavy_minus_sign:                                                 | The method paths to retrieve snippets for.                         | [<br/>{<br/>"method": "get",<br/>"path": "/pets"<br/>}<br/>]       |
| `languages`                                                        | *string*[]                                                         | :heavy_minus_sign:                                                 | The languages to retrieve snippets for.                            | [<br/>"python",<br/>"javascript"<br/>]                             |