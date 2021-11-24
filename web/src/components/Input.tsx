import IMask from "imask";
import {
  forwardRef,
  Ref,
  useImperativeHandle,
  useLayoutEffect,
  useRef
} from "react";
import "./Input.style.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: string;
}

function Input({ label, mask, ...props }: InputProps, forwardRef: Ref<HTMLInputElement>) {
  const inputRef = useRef<any>();
  useImperativeHandle(forwardRef, () => inputRef.current);

  useLayoutEffect(() => {
    if (mask) {
      IMask(inputRef.current, { mask, lazy: true });
    }
  }, [mask]);

  return (
    <div className="Input">
      {label && <label>{label}</label>}
      <input ref={inputRef} {...props} />
    </div>
  );
}

export default forwardRef(Input);
