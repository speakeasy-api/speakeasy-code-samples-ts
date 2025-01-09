# UsageSnippets

## Example Usage

```typescript
import { UsageSnippets } from "@speakeasyapi/code-samples/models/components";

let value: UsageSnippets = {
  snippets: [
    {
      operationId: "<id>",
      language: "<value>",
      code: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `snippets`                                                           | [components.UsageSnippet](../../models/components/usagesnippet.md)[] | :heavy_check_mark:                                                   | N/A                                                                  |