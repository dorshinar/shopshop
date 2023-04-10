import React from "react";

export interface InputProps {
  fullWidth?: boolean;
  textEllipsis?: boolean;
  border?: boolean;
  secondary?: boolean;
}

function Input(
  props: InputProps & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  const { fullWidth, textEllipsis, border = false, secondary, ...rest } = props;

  return (
    <input
      className={`rounded-none text-start focus:outline-none dark:border-b-slate-50 dark:bg-slate-800
      ${fullWidth && "w-full"}
      ${textEllipsis && "text-ellipsis whitespace-pre"}
      ${border && "border-b border-b-slate-800"}
      ${secondary && "text-slate-500 line-through"}
      selection:bg-sky-300
      dark:selection:bg-sky-600
      `}
      ref={ref}
      {...rest}
    />
  );
}

export default React.forwardRef(Input);
