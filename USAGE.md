<!-- Start SDK Example Usage [usage] -->
```typescript
import { SDK } from "@speakeasy-api/code-samples";
import { openAsBlob } from "node:fs";

const sdk = new SDK({
  security: {
    apiKey: "<YOUR_API_KEY_HERE>",
  },
});

async function run() {
  const result = await sdk.codesamples.preview({
    languages: [
      "<value>",
    ],
    schemaFile: await openAsBlob("example.file"),
  });

  // Handle the result
  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->