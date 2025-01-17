# MethodPaths

## Example Usage

```typescript
import { HttpMethod } from "@speakeasyapi/code-samples/models/components";
import { MethodPaths } from "@speakeasyapi/code-samples/models/operations";

let value: MethodPaths = {
  method: HttpMethod.Delete,
  path: "/opt/sbin",
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `method`                                                       | [components.HttpMethod](../../models/components/httpmethod.md) | :heavy_check_mark:                                             | N/A                                                            |
| `path`                                                         | *string*                                                       | :heavy_check_mark:                                             | N/A                                                            |