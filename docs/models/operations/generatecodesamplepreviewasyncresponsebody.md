# GenerateCodeSamplePreviewAsyncResponseBody

Job accepted, returns a job ID to poll for status and result

## Example Usage

```typescript
import { CodeSamplesJobStatus } from "@speakeasy-api/code-samples/models/components";
import { GenerateCodeSamplePreviewAsyncResponseBody } from "@speakeasy-api/code-samples/models/operations";

let value: GenerateCodeSamplePreviewAsyncResponseBody = {
  jobId: "<id>",
  status: CodeSamplesJobStatus.Running,
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `jobId`                                                                            | *string*                                                                           | :heavy_check_mark:                                                                 | The job ID for polling                                                             |
| `status`                                                                           | [components.CodeSamplesJobStatus](../../models/components/codesamplesjobstatus.md) | :heavy_check_mark:                                                                 | The current status of the job. Possible values are `pending` or `running`.         |