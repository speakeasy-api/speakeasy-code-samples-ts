import { UsageSnippet } from "../models/components/usagesnippet.js";
import { css } from "@emotion/css";
import { color, fontFamily, fontSize, fontWeight, spacing } from "./styles.js";
import { makeFilename } from "./utils.js";
import { LanguageLogo } from "./language-logo.js";

export type CodeSampleTitleComponent = React.ComponentType<UsageSnippet>;

export const CodeSampleMethodTitle = ({ method, path }: UsageSnippet) => {
  const classes = {
    root: css({
      display: "flex",
      alignItems: "center",
      fontFamily: fontFamily.mono,
      fontSize: fontSize.sm,
    }),
    method: css({
      color: color.blue,
      textTransform: "uppercase",
      lineHeight: fontSize.sm,
      fontWeight: fontWeight.semibold,
    }),
    path: css({
      marginLeft: spacing[2],
      lineHeight: fontSize.sm,
    }),
  };

  return (
    <div className={classes.root}>
      <span className={classes.method}>{method}</span>
      <span className={classes.path}>{path}</span>
    </div>
  );
};

export const CodeSampleFilenameTitle = (props: UsageSnippet) => {
  const classes = {
    root: css({
      display: "flex",
      alignItems: "center",
      fontFamily: fontFamily.mono,
      fontWeight: fontWeight.medium,
      fontSize: fontSize.sm,
    }),
    fileName: css({
      lineHeight: fontSize.sm,
      marginLeft: spacing[2],
    }),
  };

  return (
    <div className={classes.root}>
      <LanguageLogo size="18px" language={props.language} />
      <span className={classes.fileName}>{makeFilename(props)}</span>
    </div>
  );
};
