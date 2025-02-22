import { highlight } from "codehike/code";
import { CodeHikeTheme } from "./codehike/types.js";

const languageMap = {
  typescript: "TypeScript",
  go: "Go",
  java: "Java",
  python: "Python",
  csharp: "C#",
  terraform: "Terraform",
  unity: "Unity",
  php: "PHP",
  swift: "Swift",
  ruby: "Ruby",
  postman: "Postman",
} as const;

export type SupportedLanguage = keyof typeof languageMap;

/** Attempt to format the language, return the input if it can't */
export function prettyLanguageName(language: SupportedLanguage | string) {
  if (language in languageMap) {
    return languageMap[language as SupportedLanguage];
  }

  return language;
}

export const makeMockFilename = ({ language }: { language: string }) => {
  switch (language) {
    case "python":
      return "example.py";
    case "ruby":
      return "example.rb";
    case "terraform":
      return "example.tf";
    case "typescript":
      return "example.ts";
    case "csharp":
    case "unity":
      return "example.cs";
    case "java":
    case "swift":
    case "php":
    case "go":
      return `example.${language}`;
    case "postman":
      return "example.json";
    default:
      return "example";
  }
};

export async function highlightCode(
  code: string,
  language: string,
  theme: CodeHikeTheme,
) {
  const rawCode = {
    value: code,
    lang: language,
    meta: "",
  };
  return highlight(rawCode, theme);
}
