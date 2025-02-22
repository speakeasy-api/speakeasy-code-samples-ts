import { css } from "@emotion/css";
import { cssVarKey, fontSize, fontWeight, spacing } from "./styles.js";

export const classes = {
  pre: css({
    margin: 0,
    padding: `${spacing[3]} 0`,
  }),
  errorContainer: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: spacing[4],
    minHeight: "200px",
  }),
  errorTitle: css({
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    margin: 0,
  }),
  errorMessage: css({
    color: `var(${cssVarKey.foregroundError})`,
    fontSize: fontSize.sm,
    margin: 0,
  }),
};
