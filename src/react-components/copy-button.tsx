import { css } from "@emotion/css";
import * as m from "motion/react-m";
import { useCallback, useState } from "react";
import { cssVarKey, fontSize, radius, spacing } from "./styles.js";

interface CopyButtonProps {
  code: string;
  className?: string;
}

const classes = {
  button: css({
    position: "absolute",
    top: spacing[2],
    right: spacing[2],
    zIndex: 1,
    padding: spacing["1.5"],
    aspectRatio: 1,
    backgroundColor: `var(${cssVarKey.bgMuted})`,
    borderRadius: radius.md,
    border: `1px solid var(${cssVarKey.border})`,
    cursor: "pointer",
  }),
  icon: css({
    height: fontSize["lg"],
    width: fontSize["lg"],
  }),
};

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(() => false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(() => true);
    setTimeout(() => setCopied(false), 3000);
  }, [code]);

  return (
    <m.button
      onClick={handleCopy}
      className={classes.button}
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {copied ? (
        <m.div
          key="check"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <CheckIcon className={classes.icon} />
        </m.div>
      ) : (
        <m.div
          key="clipboard"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <ClipboardIcon className={classes.icon} />
        </m.div>
      )}
    </m.button>
  );
}

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
