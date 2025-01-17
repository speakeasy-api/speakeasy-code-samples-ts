<!-- Start SDK Example Usage [usage] -->
```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";
import { HttpMethod } from "@speakeasyapi/code-samples/models/components";

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
        method: HttpMethod.Get,
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