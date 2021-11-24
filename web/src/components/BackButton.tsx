import { ButtonHTMLAttributes } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

import "./BackButton.style.scss";

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
}

export default function BackButton({
  to,
  className,
  ...props
}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      className={`BackButton ${className}`}
      onClick={() => navigate(to)}
      variant="text"
      label="Voltar"
      icon={FaAngleLeft}
      {...props}
    />
  );
}
