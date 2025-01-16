# GetCodeSamplesRequest

## Example Usage

```typescript
import { GetCodeSamplesRequest } from "@speakeasyapi/code-samples/models/operations";

let value: GetCodeSamplesRequest = {
  registryUrl: "https://spec.speakeasy.com/org/ws/my-source",
  operationIds: [
    "getPetById",
  ],
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           | Example                                               |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `registryUrl`                                         | *string*                                              | :heavy_minus_sign:                                    | The registry URL from which to retrieve the snippets. | https://spec.speakeasy.com/org/ws/my-source           |
| `operationIds`                                        | *string*[]                                            | :heavy_minus_sign:                                    | The operation IDs to retrieve snippets for.           | getPetById                                            |
| `languages`                                           | *string*[]                                            | :heavy_minus_sign:                                    | The languages to retrieve snippets for.               |                                                       |