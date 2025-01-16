import { HLJSApi } from "highlight.js";
import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import php from "highlight.js/lib/languages/php";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import swift from "highlight.js/lib/languages/swift";
import typescript from "highlight.js/lib/languages/typescript";
import { clsx } from "../lib/clsx.js";

let _hljsInstance: HLJSApi;

export const languageRegistry = {
  typescript: typescript,
  python: python,
  go: go,
  java: java,
  csharp: csharp,
  php: php,
  swift: swift,
  ruby: ruby,
  plaintext: plaintext,
};

export type HighlightLanguage = keyof typeof languageRegistry;

export function getHighlighterInstance() {
  if (_hljsInstance) return _hljsInstance;

  _hljsInstance = hljs.newInstance();

  for (const [name, fn] of Object.entries(languageRegistry)) {
    _hljsInstance.registerLanguage(name, fn);
  }

  return _hljsInstance;
}

type HighlightProps = {
  /**
   * The code snippet to highlight.
   *
   * @example "const x = 1;"
   * */
  code: string;

  /**
   * The language of the code snippet.
   *
   * @example "typescript"
   * */
  language: HighlightLanguage;
} & JSX.IntrinsicElements["pre"];

/**
 * A React component that highlights code syntax using the Highlight.js library.
 *
 * To apply a theme to the highlighted code, import a highlight.js theme CSS
 * file into your project using methods like a `<link>` tag.
 *
 * @example
 * ```tsx
 * import { Highlight } from "@speakeasyapi/code-samples/react";
 *
 * const ExampleComponent: React.FC = () => (
 *    <Highlight code="const x = 1;" language="typescript" />
 * );
 * ```
 */
export const Highlight: React.FC<HighlightProps> = ({
  code,
  language,
  className,
  style,
  ...restProps
}) => {
  const hljs = getHighlighterInstance();
  const highlightedCode = hljs.highlight(code, { language }).value;

  const _className = clsx("hljs", className);

  return (
    <pre
      className={_className}
      style={{ padding: "1rem", ...style }}
      {...restProps}
    >
      <code
        dangerouslySetInnerHTML={{
          __html: highlightedCode,
        }}
      />
    </pre>
  );
};
