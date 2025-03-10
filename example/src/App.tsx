import { SpeakeasyCodeSamplesCore } from "@speakeasyapi/code-samples/core";
import {
  CodeSampleFilenameTitle,
  CodeSamplesViewer,
  SpeakeasyCodeSamplesProvider,
} from "@speakeasyapi/code-samples/react";
import "./App.css";

function App() {
  const coreSdk = new SpeakeasyCodeSamplesCore({
    apiKey: import.meta.env.VITE_SPEAKEASY_API_KEY,
    registryUrl: import.meta.env.VITE_SPEAKEASY_REGISTRY_URL,
  });

  // You can use the context provider to pass the core SDK instance to the code
  // samples viewer
  return (
    <SpeakeasyCodeSamplesProvider client={coreSdk}>
      <div style={{ width: "700px", marginInline: "auto" }}>
        <CodeSamplesViewer
          copyable
          defaultLang={"typescript"}
          title={CodeSampleFilenameTitle}
          operation={"getPassageText"}
          // client={coreSdk} 👈 optional, if you want to pass the client directly
        />
      </div>
    </SpeakeasyCodeSamplesProvider>
  );
}

export default App;
