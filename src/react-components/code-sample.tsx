import {domMax, LazyMotion} from "motion/react";
import React, {useEffect, useMemo} from "react";
import {SpeakeasyCodeSamplesCore} from "../core.js";
import {GetCodeSamplesRequest, MethodPaths,} from "../models/operations/getcodesamples.js";
import {OperationId} from "../types/custom.js";
import {useCodeSampleState} from "./code-sample.state.js";
import classes from "./code-sample.styles.js";
import {CodeViewer, ErrorDisplay} from "./code-viewer.js";
import codehikeTheme from "./codehike/theme.js";
import {CopyButton} from "./copy-button.js";
import {LanguageSelectorSkeleton, LoadingSkeleton} from "./skeleton.js";
import {getCssVars, useSystemColorMode} from "./styles.js";
import {CodeSampleFilenameTitle, CodeSampleTitle, type CodeSampleTitleComponent} from "./titles.js";
import {prettyLanguageName} from "./utils.js";
import {Selector} from "./selector";

export type CodeSamplesViewerProps = {
  /** Whether the code snippet should be copyable. */
  copyable?: boolean;

  /** Default language to show in the code playground. If not found in the snippets, the first one will be used. */
  defaultLanguage?: string;
  /** Default operation to show in the code playground. If not found in the snippets, the first one will be used. */
  defaultOperation?: string;
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
   * @see CodeSampleTitle
   * @see CodeSampleFilenameTitle
   * @default CodeSampleMethodTitle
   */
  title?: CodeSampleTitleComponent | React.ReactNode | string | "none";
  /** The operations to get code samples for. If only one is provided, no selector will be shown.
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

  className?: string | undefined;
  style?: React.CSSProperties;
};

export function CodeSamplesViewer(
  {
    theme = "system",
    title = CodeSampleFilenameTitle,
    defaultLanguage,
    defaultOperation,
    operations,
    copyable,
    client: clientProp,
    style,
    codeWindowStyle,
    className,
  }: CodeSamplesViewerProps
) {
  const requestParams: GetCodeSamplesRequest = React.useMemo(() => {
    if (typeof operations?.[0] === "string") return {operationIds: operations as OperationId[]};
    else if (operations?.[0]?.method && operations[0].path) return {methodPaths: operations as MethodPaths[]};

    return {};
  }, [operations]);

  const {state, selectSnippet} = useCodeSampleState({
    client: clientProp,
    requestParams,
  });

  // On mount, select the defaults
  useEffect(() => {
    if (!state.snippets || state.status !== "success") return;
    selectSnippet({language: defaultLanguage, operationId: defaultOperation});
  }, [state.status]);

  const systemColorMode = useSystemColorMode();
  const codeTheme = React.useMemo(() => {
    if (theme === "system") return codehikeTheme[systemColorMode];
    return codehikeTheme[theme];
  }, [theme, systemColorMode]);

  const languages: string[] = useMemo(() => {
    return [
      ...new Set(
        state.snippets?.map(({raw}) => prettyLanguageName(raw.language))
      ),
    ];
  }, [state.snippets]);

  const operationIds: string[] = useMemo(() => {
    return [
      ...new Set(
        state.snippets?.map(({raw}) => raw.operationId) ?? []
      ),
    ];
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
        {title !== "none" && (
          <div className={classes.heading}>
            <CodeSampleTitle
              component={title}
              status={state.status}
              data={state.selectedSnippet?.raw}
            />
            <div style={{display: "flex", gap: "0.75rem"}}>
              {state.status === "loading" && <div style={{width: "180px"}}>
                <LanguageSelectorSkeleton/>
              </div>}
              {state.status === "success" && operationIds.length > 1 && (
                <Selector
                  value={state.selectedSnippet?.raw.operationId}
                  values={operationIds}
                  onChange={(operationId) => selectSnippet({operationId})}
                  className={classes.selector}
                />
              )}
              {state.status === "success" && (
                <Selector
                  value={prettyLanguageName(state.selectedSnippet?.raw.language)}
                  values={languages}
                  onChange={(language) => selectSnippet({language})}
                  className={classes.selector}
                />
              )}
            </div>
          </div>)}
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
