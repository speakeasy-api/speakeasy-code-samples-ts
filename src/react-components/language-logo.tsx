import { SupportedLanguage } from "./utils.js";

interface LanguageLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  language: string;
}

const baseUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const langPaths: Record<SupportedLanguage, string> = {
  python: "python/python-original.svg",
  ruby: "ruby/ruby-plain.svg",
  terraform: "terraform/terraform-original.svg",
  typescript: "typescript/typescript-plain.svg",
  csharp: "csharp/csharp-line.svg",
  unity: "unity/unity-plain.svg",
  java: "java/java-original.svg",
  swift: "swift/swift-original.svg",
  php: "php/php-original.svg",
  go: "go/go-original-wordmark.svg",
  postman: "go/go-original-wordmark.svg",
} as const;

export const LanguageLogo = ({ language, ...imgProps }: LanguageLogoProps) => {
  const defaultDimensions = { height: 20, width: 20 };

  const path = langPaths[language as keyof typeof langPaths];

  if (!path) {
    return null;
  }

  return (
    <img
      src={`${baseUrl}/${path}`}
      alt={`${language} logo`}
      {...imgProps}
      style={{ ...defaultDimensions, ...imgProps.style }}
    />
  );
};
