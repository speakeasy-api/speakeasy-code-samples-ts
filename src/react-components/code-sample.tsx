import { Pre } from "codehike/code";
import { useMemo } from "react";
import { CopyButton } from "./copy-button.js";
import {
  GetCodeSamplesRequest,
  MethodPaths,
} from "../models/operations/getcodesamples.js";
import classes from "./code-sample.styles.js";
import {
  useHighlightedCodeSamples,
  useSafeSpeakeasyCodeSamplesContext,
  useSelectedSnippet,
} from "./hooks.js";
import { LanguageSelector } from "./language-selector.js";
import { lineNumbers } from "./codehike/line-numbers.js";
import {
  LanguageSelectorSkeleton,
  LoadingSkeleton,
  TitleSkeleton,
} from "./skeleton.js";
import { getCssVars, githubColorVars, useSystemColorMode } from "./styles.js";
import { CodeSampleFilenameTitle, CodeSampleTitleComponent } from "./titles.js";
import { tokenTransitions } from "./codehike/token-transitions.js";
import { SpeakeasyCodeSamplesCore } from "../core.js";
import { OperationId } from "../types/custom.js";
import { LazyMotion, domAnimation } from "motion/react";

export type CodeSamplesViewerProps = {
  /** Whether the code snippet should be copyable. */
  copyable?: boolean;
  /** Default language to show in the code playground. */
  defaultLang?: string;
  /**
   * The color mode for the code playground. If "system", the component will
   * detect the system color scheme automagically.
   *
   * @default 'system'
   */
  theme?: "system" | "dark" | "light";
  /**
   * A component to render as the snippet title in the upper-right corner of
   * the component. Receives data about the selected code sample. The library
   * comes pre-packaged with some sensible options.
   *
   * @see CodeSampleMethodTitle
   * @see CodeSampleFilenameTitle
   * @default CodeSampleMethodTitle
   */
  title?: CodeSampleTitleComponent;
  /** The operation to get a code sample for. Can be queried by either
   * operationId or method+path.
   */
  operation: MethodPaths | OperationId;
  /**
   * Optional client. Use this if the component is being used outside of
   * SpeakeasyCodeSamplesContext.
   */
  client?: SpeakeasyCodeSamplesCore;
  className?: string | undefined;
  style?: React.CSSProperties;
};

export function CodeSamplesViewer({
  theme = "system",
  className,
  title,
  operation,
  style,
  copyable,
  defaultLang,
  client: clientProp,
}: CodeSamplesViewerProps) {
  const TitleComponent = title;

  const systemColorMode = useSystemColorMode();

  const codeTheme = useMemo(() => {
    if (theme === "system") return githubColorVars[systemColorMode];
    return githubColorVars[theme];
  }, [theme, systemColorMode]);

  const request: GetCodeSamplesRequest = useMemo(() => {
    if (typeof operation === "string") return { operationIds: [operation] };
    return { methoPaths: [operation] };
  }, [operation]);

  const client = useSafeSpeakeasyCodeSamplesContext(clientProp);
  const { status, data, error } = useHighlightedCodeSamples(client, request);

  const { selectedSnippet, selectedLang, setSelectedLang } = useSelectedSnippet(
    data,
    defaultLang,
  );

  const longestCodeHeight = useMemo(() => {
    const largestLines = Math.max(
      ...Object.values(data ?? [])
        .filter((snippet) => snippet.code !== undefined)
        .map((code) => code.code!.split("\n").length),
    );

    const lineHeight = 23;
    const padding = 12;
    return largestLines * lineHeight + padding * 2;
  }, [data]);

  return (
    <LazyMotion strict features={domAnimation}>
      <div
        style={{
          ...codeTheme,
          ...(getCssVars(
            theme === "system" ? systemColorMode : theme,
          ) as React.CSSProperties),
          ...style,
        }}
        className={`${classes.root} ${className ?? ""}`}
      >
        <div className={classes.heading}>
          {status === "loading" && error === undefined ? (
            <TitleSkeleton />
          ) : TitleComponent && selectedSnippet ? (
            <TitleComponent {...selectedSnippet!.raw} />
          ) : (
            <CodeSampleFilenameTitle {...selectedSnippet!.raw} />
          )}
          {status === "loading" && error === undefined ? (
            <LanguageSelectorSkeleton />
          ) : (
            <LanguageSelector
              value={selectedLang}
              onChange={setSelectedLang}
              snippets={data ?? []}
              className={classes.selector}
            />
          )}
        </div>
        <div className={classes.codeContainer}>
          {status === "loading" ? (
            <LoadingSkeleton />
          ) : selectedSnippet ? (
            <>
              {copyable && <CopyButton code={selectedSnippet.code} />}
              <Pre
                className={classes.pre}
                style={{ height: longestCodeHeight }}
                handlers={[lineNumbers, tokenTransitions]}
                code={selectedSnippet}
              />
            </>
          ) : null}
        </div>
      </div>
    </LazyMotion>
  );
}
