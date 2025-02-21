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
} as const;

export const radius = {
  md: "0.375rem",
  lg: "0.5rem",
};

export const color = {
  blue: "#51a2ff",
} as const;

export const shadow = {
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
};

type CssVars = {
  "--bg-primary": string;
  "--bg-muted": string;
  "--foreground-primary": string;
  "--accent": string;
  "--border": string;
  "--gradient-skeleton": string;
};

export const cssVarKey = {
  bgPrimary: "--bg-primary",
  bgMuted: "--bg-muted",
  foregroundPrimary: "--foreground-primary",
  accent: "--accent",
  border: "--border",
  gradientSkeleton: "--gradient-skeleton",
} as const;

const darkCssVars: CssVars = {
  "--bg-primary": "#0D1117",
  "--bg-muted": "#27272A", // same as border, for now
  "--foreground-primary": "#FFFFFF",
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
  "--bg-muted": "#EAEEF2", // same as border, for now
  "--foreground-primary": "black",
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

export const githubColorVars = {
  dark: {
    "--ch-0": "dark",
    "--ch-1": "#8B949E",
    "--ch-2": "#79C0FF",
    "--ch-3": "#FFA657",
    "--ch-4": "#C9D1D9",
    "--ch-5": "#D2A8FF",
    "--ch-6": "#7EE787",
    "--ch-7": "#FF7B72",
    "--ch-8": "#A5D6FF",
    "--ch-9": "#FFA198",
    "--ch-10": "#F0F6FC",
    "--ch-11": "#490202",
    "--ch-12": "#04260F",
    "--ch-13": "#5A1E02",
    "--ch-14": "#161B22",
    "--ch-15": "#8B949E",
    "--ch-16": "#0D1117",
    "--ch-17": "#6E76811a",
    "--ch-18": "#FFFFFF0B",
    "--ch-19": "#3794FF",
    "--ch-20": "#264F78",
    "--ch-21": "#1F6FEB",
    "--ch-22": "#010409",
    "--ch-23": "#30363D",
    "--ch-24": "#6E7681",
    "--ch-25": "#6E768166",
    "--ch-26": "#0D1117E6",
  },
  light: {
    "--ch-0": "light",
    "--ch-1": "#6E7781",
    "--ch-2": "#0550AE",
    "--ch-3": "#953800",
    "--ch-4": "#24292F",
    "--ch-5": "#8250DF",
    "--ch-6": "#116329",
    "--ch-7": "#CF222e",
    "--ch-8": "#0A3069",
    "--ch-9": "#82071E",
    "--ch-10": "#f6F8Fa",
    "--ch-11": "#FFEBE9",
    "--ch-12": "#DAFBE1",
    "--ch-13": "#FFD8B5",
    "--ch-14": "#EAEEF2",
    "--ch-15": "#57606A",
    "--ch-16": "#FFFFFF",
    "--ch-17": "#EAEEF280",
    "--ch-18": "#FDFF0033",
    "--ch-19": "#1A85FF",
    "--ch-20": "#ADD6FF",
    "--ch-21": "#0969DA",
    "--ch-22": "#F6F8FA",
    "--ch-23": "#D0D7DE",
    "--ch-24": "#8C959F",
    "--ch-25": "#AFB8C133",
    "--ch-26": "#FFFFFFe6",
  },
} as const;
