# UsageSnippet

## Example Usage

```typescript
import { UsageSnippet } from "@speakeasyapi/code-samples/models/components";

let value: UsageSnippet = {
  operationId: "<id>",
  language: "<value>",
  code: "<value>",
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `operationId`                    | *string*                         | :heavy_check_mark:               | The operation ID for the snippet |
| `language`                       | *string*                         | :heavy_check_mark:               | The language of the snippet      |
| `code`                           | *string*                         | :heavy_check_mark:               | The code snippet                 |