<!-- Start SDK Example Usage [usage] -->
```typescript
import { SDK } from "@speakeasyapi/code-samples";

const sdk = new SDK({
  security: {
    apiKey: "<YOUR_API_KEY_HERE>",
  },
});

async function run() {
  const result = await sdk.codeSamples.get({
    registryUrl: "https://normal-making.name",
  });

  // Handle the result
  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->