import { css } from "@emotion/css";
import { prettyLanguageName } from "./utils.js";

const selectorStyles = css({});

interface LanguageSelectorProps {
  value?: string | undefined;
  onChange: (language: string) => void;
  snippets: { lang: string }[];
  className?: string;
}

export const LanguageSelector = ({
  value,
  onChange: onLanguageChange,
  snippets,
  className,
}: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onLanguageChange(e.target.value)}
      className={`${selectorStyles} ${className || ""}`}
    >
      {snippets.map(({ lang }, index) => (
        <option key={index} value={lang}>
          {prettyLanguageName(lang)}
        </option>
      ))}
    </select>
  );
};
