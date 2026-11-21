<!-- Start SDK Example Usage [usage] -->
```typescript
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

const speakeasyCodeSamples = new SpeakeasyCodeSamples({
  registryUrl: "https://spec.speakeasy.com/my-org/my-workspace/my-source",
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await speakeasyCodeSamples.codeSamples.get({
    operationIds: [
      "g",
      "e",
      "t",
      "P",
      "e",
      "t",
      "s",
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
<!-- End SDK Example Usage [usage] -->