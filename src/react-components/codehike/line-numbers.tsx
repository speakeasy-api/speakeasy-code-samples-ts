import { css } from "@emotion/css";
import { AnnotationHandler, InnerLine } from "codehike/code";
import { spacing } from "../styles.js";

const classes = {
  root: css({
    display: "flex",
    flexDirection: "row",
    gap: spacing["2"],
    paddingBlock: spacing["0.5"],
  }),
  lineNumber: css({
    userSelect: "none",
    paddingInlineEnd: spacing["3"],
    color: "var(--ch-1)",
  }),
  innerLine: css({
    display: "inline-block",
  }),
};

export const lineNumbers: AnnotationHandler = {
  name: "lineNumbers",
  Line: (props) => {
    const { lineNumber } = props;
    return (
      <div className={classes.root}>
        <div className={classes.lineNumber}>{lineNumber}</div>
        <InnerLine merge={props} className={classes.innerLine} />
      </div>
    );
  },
};
