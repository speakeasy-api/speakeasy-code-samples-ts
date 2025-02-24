import { css } from "@emotion/css";
import { prettyLanguageName } from "./utils.js";

const selectorStyles = css({});

interface SelectorProps {
  value?: string | undefined;
  values: string[];
  onChange: (language: string) => void;
  className?: string;
}

export const Selector = ({
  value,
  onChange,
  values,
  className,
}: SelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${selectorStyles} ${className || ""}`}
    >
      {values.map((v, index) => (
        <option key={index} value={v}>
          {prettyLanguageName(v)}
        </option>
      ))}
    </select>
  );
};
