import { HighlightedCode } from "codehike/code";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SpeakeasyCodeSamplesCore } from "../core.js";
import { codeSamplesGet } from "../funcs/codeSamplesGet.js";
import { UsageSnippet } from "../models/components/usagesnippet.js";
import { GetCodeSamplesRequest } from "../models/operations/getcodesamples.js";
import { useSpeakeasyCodeSamplesContext } from "../react-query/_context.js";
import { CodeHikeTheme, highlightCode } from "./utils.js";

type SpeakeasyHighlightedCode = HighlightedCode & {
  /** The snippet data from the code samples api */
  raw: UsageSnippet;
};

type LoadingState = {
  status: "loading";
  data?: SpeakeasyHighlightedCode[];
  error?: Error;
};

type ErrorState = {
  status: "error";
  data?: SpeakeasyHighlightedCode[];
  error: Error;
};

type SuccessState = {
  status: "success";
  data: SpeakeasyHighlightedCode[];
  error?: Error;
};

type CodeSamplesState = LoadingState | ErrorState | SuccessState;

export const useSafeSpeakeasyCodeSamplesContext = (opts?: {
  apiKey: string;
  registryUrl: string;
}) => {
  if (opts) {
    return new SpeakeasyCodeSamplesCore(opts);
  }

  try {
    const ctx = useSpeakeasyCodeSamplesContext();
    return ctx;
  } catch {
    throw new Error(
      "The Speakeasy Code Samples component must either be given an apiKey and " +
        "registryUrl, or be wrapped in a SpeakeasyCodeSamplesProvider.",
    );
  }
};

export const useHighlightedCodeSamples = (
  client: SpeakeasyCodeSamplesCore,
  request: GetCodeSamplesRequest,
): CodeSamplesState => {
  const [state, setState] = useState<CodeSamplesState>({
    status: "loading",
  });

  const fetchData = useCallback(async () => {
    setState({ status: "loading" });
    const result = await codeSamplesGet(client, request);

    if (!result.ok) {
      return setState({ status: "error", error: result.error });
    }

    const highlights: SpeakeasyHighlightedCode[] = [];
    for (const snippet of result.value.snippets) {
      const highlightedCode = await highlightCode(
        snippet.code,
        snippet.language,
        "github-from-css",
      );

      highlights.push({ ...highlightedCode, raw: snippet });
    }

    setState({ status: "success", data: highlights });
  }, [client, request]);

  useEffect(() => {
    fetchData();
  }, [client]);

  return state;
};

export function useSelectedSnippet(
  snippets: SpeakeasyHighlightedCode[] | undefined,
) {
  const [selectedLang, setSelectedLang] = useState<string>();

  const selectedSnippet = useMemo(
    () => snippets?.find((s) => s.lang === (selectedLang ?? snippets[0]?.lang)),
    [snippets, selectedLang],
  );

  return {
    selectedLang: selectedLang ?? snippets?.[0]?.lang,
    setSelectedLang,
    selectedSnippet,
  };
}

export function useCodeHighlighting(
  code: string,
  language: string,
  theme: "dark" | "light",
) {
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null);

  const updateHighlighted = useCallback(
    async (code: string, language: string, theme: CodeHikeTheme) => {
      const highlighted = await highlightCode(code, language, theme);
      setHighlighted(highlighted);
    },
    [],
  );

  useEffect(() => {
    const chTheme = theme === "dark" ? "github-dark" : "github-light";
    updateHighlighted(code, language, chTheme);
  }, [code, language, theme, updateHighlighted]);

  return highlighted;
}
