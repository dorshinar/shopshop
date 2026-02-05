import React from "react";

export interface InputProps {
  fullWidth?: boolean;
  textEllipsis?: boolean;
  border?: boolean;
  secondary?: boolean;
}

function Input(
  props: InputProps & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) {
  const { fullWidth, textEllipsis, border = false, secondary, ...rest } = props;

  return (
    <input
      className={`rounded-md text-start bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all px-2 py-1 -mx-2 -my-1 dark:border-b-slate-50
      ${fullWidth && "w-full"}
      ${textEllipsis && "text-ellipsis whitespace-pre"}
      ${border && "border-b border-b-slate-300 dark:border-b-slate-600 focus:border-b-sky-500"}
      ${secondary && "text-slate-400 line-through dark:text-slate-500"}
      selection:bg-sky-200
      dark:selection:bg-sky-600
      `}
      ref={ref}
      {...rest}
    />
  );
}

export default React.forwardRef(Input);
