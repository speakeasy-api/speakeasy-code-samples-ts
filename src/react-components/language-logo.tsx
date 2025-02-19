import _PythonPlain from "devicons-react/icons/PythonPlain";
import _CsharpPlain from "devicons-react/icons/CsharpPlain";
import _GoPlain from "devicons-react/icons/GoPlain";
import _JavaPlain from "devicons-react/icons/JavaPlain";
import _PhpPlain from "devicons-react/icons/PhpPlain";
import _PostmanPlain from "devicons-react/icons/PostmanPlain";
import _RubyPlain from "devicons-react/icons/RubyPlain";
import _SwiftPlain from "devicons-react/icons/SwiftPlain";
import _TerraformPlain from "devicons-react/icons/TerraformPlain";
import _TypescriptPlain from "devicons-react/icons/TypescriptPlain";
import _UnityPlain from "devicons-react/icons/UnityPlain";

const PythonPlain = _PythonPlain.default;
const CsharpPlain = _CsharpPlain.default;
const GoPlain = _GoPlain.default;
const JavaPlain = _JavaPlain.default;
const PhpPlain = _PhpPlain.default;
const PostmanPlain = _PostmanPlain.default;
const RubyPlain = _RubyPlain.default;
const SwiftPlain = _SwiftPlain.default;
const TerraformPlain = _TerraformPlain.default;
const TypescriptPlain = _TypescriptPlain.default;
const UnityPlain = _UnityPlain.default;

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
