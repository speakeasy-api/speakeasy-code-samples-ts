import { css } from "@emotion/css";
import { cssVarKey } from "./styles.js";

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

export default classes;
