import {
  CodeSample,
  SpeakeasyCodeSamplesProvider,
  SupportedLanguage,
} from "@speakeasyapi/code-samples/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { SpeakeasyCodeSamplesCore } from "@speakeasyapi/code-samples/core";

const CodeSampleHeader = ({ lang }: { lang: SupportedLanguage }) => {
  let filename = "example";

  switch (lang) {
    case "python":
      filename += ".py";
      break;
    case "ruby":
      filename += ".rb";
      break;
    case "terraform":
      filename += ".tf";
      break;
    case "typescript":
      filename += ".ts";
      break;
    case "csharp":
    case "unity":
      filename += ".cs";
      break;
    case "java":
    case "swift":
    case "php":
    case "go":
      filename += `.${lang}`;
      break;
    case "postman":
      filename += ".json";
      break;
    default:
      throw new Error("unsupported language: " + lang);
  }

  return (
    <span style={{ color: "var(--ch-1)", marginLeft: 4 }}>{filename}</span>
  );
};

function App() {
  const queryClient = new QueryClient();
  const coreSdk = new SpeakeasyCodeSamplesCore({
    apiKey: import.meta.env.VITE_SPEAKEASY_API_KEY,
    registryUrl: import.meta.env.VITE_SPEAKEASY_REGISTRY_URL,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SpeakeasyCodeSamplesProvider client={coreSdk}>
        <h1 className="bg-background">Speakeasy Code Samples</h1>
        <div style={{ width: "660px" }}>
          <CodeSample
            operation={{ operationId: "getPassageText" }}
            heading={({ selectedLang }) => (
              <CodeSampleHeader lang={selectedLang} />
            )}
            mode="system"
          />
        </div>
      </SpeakeasyCodeSamplesProvider>
    </QueryClientProvider>
  );
}

export default App;
