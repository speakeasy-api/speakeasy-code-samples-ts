import { useCallback, useEffect, useMemo, useState } from "react";
import { UsageSnippet } from "../models/components/usagesnippet.js";
import { NonEmptyArray } from "../types/custom.js";
import { CodeHikeTheme, highlightCode } from "./utils.js";
import { HighlightedCode } from "codehike/code";

export function useSelectedSnippet(snippets: NonEmptyArray<UsageSnippet>) {
  const [selectedLang, setSelectedLang] = useState<string>(
    snippets[0].language,
  );

  const selectedSnippet = useMemo(() => {
    const snippet = snippets.find((s) => s.language === selectedLang);
    if (!snippet)
      throw Error(`The selected language ${selectedLang} does not exist`);
    return snippet;
  }, [selectedLang, snippets]);

  return {
    selectedLang,
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
