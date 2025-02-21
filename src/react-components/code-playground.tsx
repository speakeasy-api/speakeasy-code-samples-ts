import { css } from "@emotion/css";
import { Pre } from "codehike/code";
import { useMemo } from "react";
import {
  GetCodeSamplesRequest,
  MethodPaths,
} from "../models/operations/getcodesamples.js";
import {
  useHighlightedCodeSamples,
  useSafeSpeakeasyCodeSamplesContext,
  useSelectedSnippet,
} from "./hooks.js";
import { LanguageSelector } from "./language-selector.js";
import { lineNumbers } from "./line-numbers.js";
import {
  LanguageSelectorSkeleton,
  LoadingSkeleton,
  TitleSkeleton,
} from "./skeleton.js";
import {
  cssVarKey,
  getCssVars,
  githubColorVars,
  useSystemColorMode,
} from "./styles.js";
import { CodeSampleTitleComponent } from "./titles.js";
import { tokenTransitions } from "./token-transitions.js";

const classes = {
  root: css({
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: `var(${cssVarKey.border})`,
    borderRadius: "0.5rem",
    position: "relative",
    backgroundColor: `var(${cssVarKey.bgPrimary})`,
  }),
  heading: css({
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid var(${cssVarKey.border})`,
    padding: "0.5rem",
  }),
  selector: css({}),
  codeContainer: css({
    position: "relative",
    paddingInline: "0.75rem",
    overflowX: "scroll",
  }),
  pre: css({
    position: "relative",
  }),
};

type OperationId = string;

export type CodePlaygroundProps = {
  theme?: "system" | "dark" | "light";
  className?: string | undefined;
  title?: CodeSampleTitleComponent;
  operation: MethodPaths | OperationId;
};

export function CodePlayground({
  theme = "system",
  className,
  title,
  operation,
}: CodePlaygroundProps) {
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

  const client = useSafeSpeakeasyCodeSamplesContext();
  const { status, data, error } = useHighlightedCodeSamples(client, request);

  const { selectedSnippet, selectedLang, setSelectedLang } =
    useSelectedSnippet(data);

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
    <div
      style={{
        ...codeTheme,
        ...(getCssVars(
          theme === "system" ? systemColorMode : theme,
        ) as React.CSSProperties),
      }}
      className={`${classes.root} ${className}`}
    >
      <div className={classes.heading}>
        {status === "loading" && error === undefined ? (
          <TitleSkeleton />
        ) : TitleComponent && selectedSnippet ? (
          <TitleComponent {...selectedSnippet!.raw} />
        ) : null}
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
          <Pre
            className={classes.pre}
            style={{ height: longestCodeHeight }}
            handlers={[lineNumbers, tokenTransitions]}
            code={selectedSnippet}
          />
        ) : null}
      </div>
    </div>
  );
}
