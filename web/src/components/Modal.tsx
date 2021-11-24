import { HTMLAttributes } from "react";
import "./Modal.style.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  onExit: () => void;
}

export default function Modal({ children, onExit, ...props }: ModalProps) {
  return (
    <div onClick={onExit} className="ModalContainer">
      <div
        onClick={(event) => event.stopPropagation()}
        className="Modal"
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
