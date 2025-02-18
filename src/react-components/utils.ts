import { highlight } from "codehike/code";

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
type PrettyLanguage = (typeof languageMap)[SupportedLanguage];

/** Attempt to format the language, return the input if it can't */
export function prettyLanguageName(
  language: SupportedLanguage | string,
): PrettyLanguage | string {
  if (isSupportedLanguage(language)) {
    return languageMap[language];
  }

  return language;
}

function isSupportedLanguage(language: string): language is SupportedLanguage {
  return language in languageMap;
}

export const makeFilename = ({ language }: { language: string }) => {
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

export type CodeHikeTheme = Parameters<typeof highlight>[1];

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
