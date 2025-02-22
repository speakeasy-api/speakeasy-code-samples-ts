import { HighlightedCode, Pre } from "codehike/code";
import { classes } from "./code-viewer.styles.js";
import { lineNumbers } from "./codehike/line-numbers.js";
import { tokenTransitions } from "./codehike/token-transitions.js";

interface CodeDisplayProps {
  status: "loading" | "success" | "error";
  error?: Error;
  code: HighlightedCode;
  longestCodeHeight: number;
}

export function CodeViewer({ code, longestCodeHeight }: CodeDisplayProps) {
  return (
    <Pre
      className={classes.pre}
      style={{ height: longestCodeHeight }}
      handlers={[lineNumbers, tokenTransitions]}
      code={code}
    />
  );
}

export function ErrorDisplay({ error }: { error: Error }) {
  return (
    <div className={classes.errorContainer}>
      <span className={classes.errorTitle}>
        The code sample couldn't be displayed.
      </span>
      <p className={classes.errorMessage}>
        {error?.message || "Failed to load code sample."}
      </p>
    </div>
  );
}
