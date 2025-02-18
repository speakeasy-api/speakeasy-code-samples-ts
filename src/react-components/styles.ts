import { useCallback, useEffect, useState } from "react";

export const fontFamily = {
  mono: `monospace, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New"`,
  sans: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
} as const;

export const fontSize = {
  sm: "0.875rem",
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const spacing = {
  "0.5": "0.125rem",
  "1": "0.25rem",
  "2": "0.5rem",
} as const;

export const color = {
  blue: "#51a2ff",
} as const;

type CssVars = {
  "--bg-primary": string;
  "--foreground-primary": string;
  "--accent": string;
  "--border": string;
};

export const cssVarKey = {
  bgPrimary: "--bg-primary",
  foregroundPrimary: "--foreground-primary",
  accent: "--accent",
  border: "--border",
} as const;

const darkCssVars: CssVars = {
  "--bg-primary": "#0D1117",
  "--foreground-primary": "#FFFFFF",
  "--accent": "#51A2FF",
  "--border": "#27272A",
} as const;

const lightCssVars: CssVars = {
  "--bg-primary": "white",
  "--foreground-primary": "black",
  "--accent": "#51A2FF",
  "--border": "#E4E4E7",
} as const;

export const getCssVars = (mode?: "dark" | "light"): CssVars => {
  if (mode === "dark") {
    return darkCssVars;
  }

  return lightCssVars;
};

export function useSystemColorMode() {
  const [mode, setMode] = useState<"dark" | "light">("light");

  const handleMatchMediaChangeEvt = useCallback((evt: MediaQueryListEvent) => {
    if (evt.matches) return setMode("dark");
    setMode("light");
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    if (mq.matches) {
      setMode("dark");
    }

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener("change", handleMatchMediaChangeEvt);

    return () => {
      mq.removeEventListener("change", handleMatchMediaChangeEvt);
    };
  }, []);

  return mode;
}
