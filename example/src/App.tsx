import {
  CodeSample,
  SpeakeasyCodeSamplesProvider,
  CodeSampleFilenameTitle,
} from "@speakeasyapi/code-samples/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { SpeakeasyCodeSamplesCore } from "@speakeasyapi/code-samples/core";
import { SpeakeasyCodeSamples } from "@speakeasyapi/code-samples";

function App() {
  console.log({ SpeakeasyCodeSamples });

  const queryClient = new QueryClient();
  const coreSdk = new SpeakeasyCodeSamplesCore({
    apiKey: import.meta.env.VITE_SPEAKEASY_API_KEY,
    registryUrl: import.meta.env.VITE_SPEAKEASY_REGISTRY_URL,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SpeakeasyCodeSamplesProvider client={coreSdk}>
        <h1 className="">Speakeasy Code Samples</h1>
        <div style={{ width: "660px", marginInline: "auto" }}>
          <CodeSample
            title={CodeSampleFilenameTitle}
            operation={{ operationId: "getPassageText" }}
          />
        </div>
      </SpeakeasyCodeSamplesProvider>
    </QueryClientProvider>
  );
}

export default App;
