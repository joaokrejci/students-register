import { PropsWithChildren } from "react";
import "./style.scss";

type TextProps = PropsWithChildren<{
  variant?: "title" | "caption" | "normal" | "label";
  size?: "large" | "normal" | "small" | number;
}>;

export default function Text({
  variant = "normal",
  size = "normal",
  children,
}: TextProps) {
  const TEXT_SIZES = {
    large: "2em",
    normal: "1em",
    small: "0.7em",
  };

  const style = {
    fontSize: typeof size === "string" ? TEXT_SIZES[size] : size,
  };

  const TEXT_VARIANTS = {
    title: (
      <h1 className="Text title" style={style}>
        {children}
      </h1>
    ),
    normal: (
      <p className="Text normal" style={style}>
        {children}
      </p>
    ),
    caption: (
      <span className="Text caption" style={style}>
        {children}
      </span>
    ),
    label: (
      <span className="Text label" style={style}>
        {children}
      </span>
    ),
  };

  return TEXT_VARIANTS[variant];
}
