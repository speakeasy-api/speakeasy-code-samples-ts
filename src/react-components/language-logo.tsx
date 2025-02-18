import {
  CsharpPlain,
  GoPlain,
  JavaPlain,
  PhpPlain,
  PostmanPlain,
  PythonPlain,
  RubyPlain,
  SwiftPlain,
  TerraformPlain,
  TypescriptPlain,
  UnityPlain,
} from "devicons-react";

interface LanguageLogoProps extends React.SVGProps<SVGElement> {
  language: string;
  color?: string;
  size?: number | string;
}

export const LanguageLogo = ({ language, ...svgProps }: LanguageLogoProps) => {
  switch (language) {
    case "python":
      return <PythonPlain {...svgProps} />;
    case "ruby":
      return <RubyPlain {...svgProps} />;
    case "terraform":
      return <TerraformPlain {...svgProps} />;
    case "typescript":
      return <TypescriptPlain {...svgProps} />;
    case "csharp":
      return <CsharpPlain {...svgProps} />;
    case "unity":
      return <UnityPlain {...svgProps} />;
    case "java":
      return <JavaPlain {...svgProps} />;
    case "swift":
      return <SwiftPlain {...svgProps} />;
    case "php":
      return <PhpPlain {...svgProps} />;
    case "go":
      return <GoPlain {...svgProps} />;
    case "postman":
      return <PostmanPlain {...svgProps} />;
    default:
      return null;
  }
};
