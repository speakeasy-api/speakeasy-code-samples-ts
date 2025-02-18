import { css } from "@emotion/css";
import { Pre } from "codehike/code";
import { UsageSnippet } from "../models/components/usagesnippet.js";
import { NonEmptyArray } from "../types/custom.js";
import { CodeSampleTitleComponent } from "./titles.js";
import { prettyLanguageName } from "./utils.js";
import { cssVarKey, getCssVars } from "./styles.js";
import { useCodeHighlighting, useSelectedSnippet } from "./hooks.js";

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
    paddingInline: "0.75rem",
  }),
};

export type CodePlaygroundProps = {
  snippets: NonEmptyArray<UsageSnippet>;
  theme?: "dark" | "light";
  className?: string | undefined;
  title?: CodeSampleTitleComponent;
};

export function CodePlayground({
  snippets,
  theme = "light",
  className,
  title,
}: CodePlaygroundProps) {
  const TitleComponent = title;

  const { selectedSnippet, selectedLang, setSelectedLang } =
    useSelectedSnippet(snippets);

  //const [selectedLang, setSelectedLang] = useState<string>(
  //  snippets[0].language,
  //);
  //
  //const selectedSnippet: UsageSnippet = useMemo(() => {
  //  const snippet = snippets.find((s) => s.language === selectedLang);
  //  if (!snippet)
  //    throw Error(`The selected language ${selectedLang} does not exist`);
  //  return snippet;
  //}, [selectedLang]);
  //

  const highlighted = useCodeHighlighting(
    selectedSnippet.code,
    selectedLang,
    theme,
  );

  //const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null);
  //
  //const updateHighlighted = useCallback(
  //  async (code: string, language: string, theme: CodeHikeTheme) => {
  //    const highlighted = await highlightCode(code, language, theme);
  //    setHighlighted(highlighted);
  //  },
  //  [],
  //);

  //useEffect(() => {
  //  const chTheme = theme === "dark" ? "github-dark" : "github-light";
  //  updateHighlighted(selectedSnippet.code, selectedLang, chTheme);
  //}, [selectedSnippet, selectedLang, theme]);
  //
  //useEffect(() => {
  //  const chTheme = theme === "dark" ? "github-dark" : "github-light";
  //  updateHighlighted(selectedSnippet.code, selectedLang, chTheme);
  //}, [selectedLang, theme]);

  return (
    <div
      style={{ ...(getCssVars(theme) as React.CSSProperties) }}
      className={`${classes.root} ${className}`}
    >
      <div className={classes.heading}>
        {TitleComponent ? <TitleComponent {...selectedSnippet} /> : <div></div>}
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className={classes.selector}
        >
          {snippets.map(({ language }, index) => (
            <option key={index} value={language}>
              {prettyLanguageName(language)}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.codeContainer}>
        {highlighted && <Pre code={highlighted}></Pre>}
      </div>
    </div>
  );
}
