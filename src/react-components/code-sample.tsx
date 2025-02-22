import { LazyMotion, domMax } from "motion/react";
import React from "react";
import { SpeakeasyCodeSamplesCore } from "../core.js";
import {
  GetCodeSamplesRequest,
  MethodPaths,
} from "../models/operations/getcodesamples.js";
import { OperationId } from "../types/custom.js";
import { useCodeSampleState } from "./code-sample.state.js";
import classes from "./code-sample.styles.js";
import { CodeViewer, ErrorDisplay } from "./code-viewer.js";
import codehikeTheme from "./codehike/theme.js";
import { CopyButton } from "./copy-button.js";
import { LanguageSelector } from "./language-selector.js";
import { LanguageSelectorSkeleton, LoadingSkeleton } from "./skeleton.js";
import { getCssVars, useSystemColorMode } from "./styles.js";
import { type CodeSampleTitleComponent, CodeSampleTitle } from "./titles.js";

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
  title?: CodeSampleTitleComponent | React.ReactNode | string;
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
  client: clientProp,
}: CodeSamplesViewerProps) {
  const request: GetCodeSamplesRequest = React.useMemo(() => {
    if (typeof operation === "string") return { operationIds: [operation] };
    return { methoPaths: [operation] };
  }, [operation]);

  const { state, setSelectedLanguage } = useCodeSampleState({
    client: clientProp,
    requestParams: request,
  });

  const systemColorMode = useSystemColorMode();
  const codeTheme = React.useMemo(() => {
    if (theme === "system") return codehikeTheme[systemColorMode];
    return codehikeTheme[theme];
  }, [theme, systemColorMode]);

  const longestCodeHeight = React.useMemo(() => {
    const largestLines = Math.max(
      ...Object.values(state.snippets ?? [])
        .filter((snippet) => snippet.code !== undefined)
        .map((code) => code.code!.split("\n").length),
    );

    const lineHeight = 23;
    const padding = 12;
    return largestLines * lineHeight + padding * 2;
  }, [state.snippets]);

  return (
    <LazyMotion strict features={domMax}>
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
          <CodeSampleTitle
            component={title}
            status={state.status}
            data={state.selectedSnippet?.raw}
          />
          <>
            {state.status === "loading" && <LanguageSelectorSkeleton />}
            {state.status === "success" && (
              <LanguageSelector
                value={state.selectedSnippet?.lang}
                onChange={setSelectedLanguage}
                snippets={state.snippets ?? []}
                className={classes.selector}
              />
            )}
          </>
        </div>
        <div className={classes.codeContainer}>
          {state.status === "success" && copyable && (
            <CopyButton code={state.selectedSnippet.code} />
          )}
          {state.status === "loading" && <LoadingSkeleton />}
          {state.status === "error" && <ErrorDisplay error={state.error} />}
          {state.status === "success" && (
            <CodeViewer
              status={state.status}
              code={state.selectedSnippet}
              longestCodeHeight={longestCodeHeight}
            />
          )}
        </div>
      </div>
    </LazyMotion>
  );
}
