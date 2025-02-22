import { useCallback, useEffect, useState } from "react";

export const fontFamily = {
  mono: `monospace, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New"`,
  sans: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
} as const;

export const fontSize = {
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
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
  "1.5": "0.375rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
} as const;

export const radius = {
  md: "0.375rem",
  lg: "0.5rem",
} as const;

export const color = {
  blue: "#51a2ff",
} as const;

export const shadow = {
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
};

type CssVars = {
  "--bg-primary": string;
  "--bg-muted": string;
  "--bg-error": string;
  "--foreground-primary": string;
  "--foreground-error": string;
  "--accent": string;
  "--border": string;
  "--gradient-skeleton": string;
};

export const cssVarKey = {
  bgPrimary: "--bg-primary",
  bgMuted: "--bg-muted",
  bgError: "--bg-error",
  foregroundPrimary: "--foreground-primary",
  foregroundError: "--foreground-error",
  accent: "--accent",
  border: "--border",
  gradientSkeleton: "--gradient-skeleton",
} as const;

const darkCssVars: CssVars = {
  "--bg-primary": "#0D1117",
  "--bg-muted": "#27272A",
  "--bg-error": "#461B19",
  "--foreground-primary": "#FFFFFF",
  "--foreground-error": "#F85149",
  "--accent": "#51A2FF",
  "--border": "#27272A",
  "--gradient-skeleton": `linear-gradient(
    90deg,
    rgba(100, 100, 100, 0),
    rgba(100, 100, 100, 0.15),
    rgba(100, 100, 100, 0.0)
  )`,
} as const;

const lightCssVars: CssVars = {
  "--bg-primary": "white",
  "--bg-muted": "#EAEEF2",
  "--bg-error": "#461B19",
  "--foreground-error": "#F85149",
  "--foreground-primary": "#000000",
  "--accent": "#51A2FF",
  "--border": "#E4E4E7",
  "--gradient-skeleton": `linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.00),
    rgba(255, 255, 255, 0.50),
    rgba(255, 255, 255, 0.00)
  )`,
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
