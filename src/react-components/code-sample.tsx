import {domMax, LazyMotion} from "motion/react";
import React, {useEffect, useMemo} from "react";
import {SpeakeasyCodeSamplesCore} from "../core.js";
import {GetCodeSamplesRequest, MethodPaths,} from "../models/operations/getcodesamples.js";
import {OperationId} from "../types/custom.js";
import {getMethodPath, useCodeSampleState} from "./code-sample.state.js";
import classes from "./code-sample.styles.js";
import {CodeViewer, ErrorDisplay} from "./code-viewer.js";
import codehikeTheme from "./codehike/theme.js";
import {CopyButton} from "./copy-button.js";
import {LanguageSelectorSkeleton, LoadingSkeleton} from "./skeleton.js";
import {getCssVars, useSystemColorMode} from "./styles.js";
import {CodeSampleFilenameTitle, CodeSampleTitle, type CodeSampleTitleComponent,} from "./titles.js";
import {prettyLanguageName} from "./utils.js";
import {Selector} from "./selector";
import {UsageSnippet} from "../models/components";

export type CodeSamplesViewerProps = {
  /** Whether the code snippet should be copyable. */
  copyable?: boolean;

  /** Default language to show in the code playground. If not found in the snippets, the first one will be used. */
  defaultLanguage?: string;

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
   * If set to false, no title bar will be shown.
   *
   * @see CodeSampleTitle
   * @see CodeSampleFilenameTitle
   * @default CodeSampleMethodTitle
   */
  title?: CodeSampleTitleComponent | React.ReactNode | string | false;
  /**
   * The operations to get code samples for. If only one is provided, no selector will be shown.
   * Can be queried by either operationId or method+path.
   */
  operations?: MethodPaths[] | OperationId[];
  /**
   * Optional client. Use this if the component is being used outside of
   * SpeakeasyCodeSamplesContext.
   */
  client?: SpeakeasyCodeSamplesCore;
  /**
   * Sets the style of the code window.
   */
  codeWindowStyle?: React.CSSProperties;
  /**
   * If true, the code window will be fixed to the height of the longest code snippet.
   * This can be useful for preventing layout shifts when switching between code snippets.
   * Overrides any height set in codeWindowStyle.
   */
  fixedHeight?: boolean;

  className?: string | undefined;
  style?: React.CSSProperties;
};

export function CodeSamplesViewer({
                                    theme = "system",
                                    title = CodeSampleFilenameTitle,
                                    defaultLanguage,
                                    operations,
                                    copyable,
                                    client: clientProp,
                                    style,
                                    codeWindowStyle,
                                    fixedHeight,
                                    className,
                                  }: CodeSamplesViewerProps) {
  const requestParams: GetCodeSamplesRequest = React.useMemo(() => {
    if (typeof operations?.[0] === "string")
      return {operationIds: operations as OperationId[]};
    else if (operations?.[0]?.method && operations[0].path)
      return {methodPaths: operations as MethodPaths[]};

    return {};
  }, [operations]);

  const {state, selectSnippet} = useCodeSampleState({
    client: clientProp,
    requestParams,
  });

  // On mount, select the defaults
  useEffect(() => {
    if (!state.snippets || state.status !== "success") return;
    selectSnippet({language: defaultLanguage});
  }, [state.status]);

  const systemColorMode = useSystemColorMode();
  const codeTheme = React.useMemo(() => {
    if (theme === "system") return codehikeTheme[systemColorMode];
    return codehikeTheme[theme];
  }, [theme, systemColorMode]);

  const languages: string[] = useMemo(() => {
    return [
      ...new Set(
        state.snippets?.map(({raw}) => prettyLanguageName(raw.language)),
      ),
    ];
  }, [state.snippets]);

  const getOperationKey = (snippet: UsageSnippet | undefined): string => {
    let {operationId} = snippet;
    const methodPathDisplay = getMethodPath(snippet);
    if (!operationId) {
      operationId = methodPathDisplay;
    }
    return operationId;
  };

  // We need this methodAndPath stuff because not all snippets will have operation ids
  // For the selector, we try to show operation ID but fall back on method+path if it's missing
  const operationIdToMethodAndPath: Record<string, string> = useMemo(() => {
    return Object.fromEntries(
      state.snippets?.map(({raw}) => [
        getOperationKey(raw),
        getMethodPath(raw),
      ]) ?? [],
    );
  }, [state.snippets]);

  const operationIds = Object.keys(operationIdToMethodAndPath);

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

  if (fixedHeight) {
    codeWindowStyle = {
      ...codeWindowStyle,
      height: longestCodeHeight,
    };
  }

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
        {title !== false && (
          <div className={classes.heading}>
            <CodeSampleTitle
              component={title}
              status={state.status}
              data={state.selectedSnippet?.raw}
            />
            <div style={{display: "flex", gap: "0.75rem"}}>
              {state.status === "loading" && (
                <div style={{width: "180px"}}>
                  <LanguageSelectorSkeleton/>
                </div>
              )}
              {state.status === "success" && operationIds.length > 1 && (
                <Selector
                  value={getOperationKey(state.selectedSnippet?.raw)}
                  values={operationIds}
                  onChange={(operationId: string) =>
                    selectSnippet({
                      methodPath: operationIdToMethodAndPath[operationId],
                    })
                  }
                  className={classes.selector}
                />
              )}
              {state.status === "success" && (
                <Selector
                  value={prettyLanguageName(
                    state.selectedSnippet?.raw.language,
                  )}
                  values={languages}
                  onChange={(language: string) => selectSnippet({language})}
                  className={classes.selector}
                />
              )}
            </div>
          </div>
        )}
        <div className={classes.codeContainer}>
          {state.status === "success" && copyable && (
            <CopyButton code={state.selectedSnippet.code}/>
          )}
          {state.status === "loading" && <LoadingSkeleton/>}
          {state.status === "error" && <ErrorDisplay error={state.error}/>}
          {state.status === "success" && (
            <CodeViewer
              status={state.status}
              code={state.selectedSnippet}
              style={codeWindowStyle}
            />
          )}
        </div>
      </div>
    </LazyMotion>
  );
}
