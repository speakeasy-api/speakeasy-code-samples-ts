import {css} from "@emotion/css";
import {cssVarKey} from "./styles.js";

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
    padding: "0.5rem 1rem",
  }),
  selector: css({
    padding: "0.5rem 0.25rem 0.5rem 0.5rem", // Less padding on the right side to account for the arrow
    borderRadius: "0.25rem",
    backgroundColor: `var(${cssVarKey.bgPrimary})`,
    fontSize: "0.875rem",
    border: `1px solid var(${cssVarKey.border})`,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: `var(${cssVarKey.bgMuted})`,
    },
    "&::-webkit-select-arrow": {
      color: `red`, // For WebKit browsers
    }
  }),
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
