import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import Text from "../Text";
import "./style.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "round" | "normal" | "text";
  label?: string;
  icon?: IconType;
}

export default function Button({
  variant = "normal",
  label,
  icon: Icon,
  className = "",
  ...props
}: PropsWithChildren<ButtonProps>) {
  const BUTTON_VARIANTS = {
    text: (
      <button {...props} className={`Button text ${className}`}>
        {Icon && <Icon />} <Text variant="label"> {label}</Text>
      </button>
    ),
    normal: (
      <button {...props} className={`Button normal ${className}`}>
        {Icon && <Icon />} <Text variant="label"> {label}</Text>
      </button>
    ),
    round: (
      <button {...props} className={`Button round ${className}`}>
        <div>{Icon && <Icon />}</div>
        <Text variant="label">{label}</Text>
      </button>
    ),
  };

  return BUTTON_VARIANTS[variant];
}
