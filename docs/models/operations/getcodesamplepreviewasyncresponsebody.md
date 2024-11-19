# GetCodeSamplePreviewAsyncResponseBody

Job is still in progress

## Example Usage

```typescript
import { CodeSamplesJobStatus } from "@speakeasy-api/code-samples/models/components";
import { GetCodeSamplePreviewAsyncResponseBody } from "@speakeasy-api/code-samples/models/operations";

let value: GetCodeSamplePreviewAsyncResponseBody = {
  status: CodeSamplesJobStatus.Running,
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `status`                                                                           | [components.CodeSamplesJobStatus](../../models/components/codesamplesjobstatus.md) | :heavy_check_mark:                                                                 | The current status of the job. Possible values are `pending` or `running`.         |