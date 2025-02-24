import {css} from "@emotion/css";
import React from "react";
import {UsageSnippet} from "../models/components/usagesnippet.js";
import {LanguageLogo} from "./language-logo.js";
import {TitleSkeleton} from "./skeleton.js";
import {color, cssVarKey, fontFamily, fontSize, fontWeight, spacing,} from "./styles.js";
import {makeMockFilename} from "./utils.js";

export type CodeSampleTitleComponent = (
  props: UsageSnippet,
) => React.ReactNode | React.ReactNode | string;

export const CodeSampleMethodPathTitle = ({method, path}: UsageSnippet) => {
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
      <LanguageLogo language={props.language}/>
      <span className={classes.fileName}>{makeMockFilename(props)}</span>
    </div>
  );
};

type TitleComponentProps = {
  status: string;
  component?: any;
  data?: UsageSnippet | undefined;
};

export const CodeSampleTitle: React.FC<TitleComponentProps> = (props) => {
  if (props.status === "error") {
    return <div style={{color: `var(${cssVarKey.foregroundError})`}}></div>;
  }

  if (props.status !== "success") return <TitleSkeleton/>;

  if (React.isValidElement(props.component)) return props.component;

  if (typeof props.component === "string") {
    if (props.component === "none") return null;
    return <span>{props.component}</span>;
  }

  if (typeof props.component === "function") {
    return props.component(props.data!);
  }

  return "Invalid title";
};
