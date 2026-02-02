import React from "react";

interface Props {
  Icon: React.ComponentType<{
    className?: string;
  }>;
  size?: "large" | "small";
}

function InnerIconButton(
  {
    Icon,
    size = "large",
    ...props
  }: Props & React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      className={`cursor-pointer grid place-items-center rounded-md outline-offset-2 outline-sky-600 focus-visible:outline-1 transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700
        ${size === "large" ? `h-11 w-11 md:h-6 md:w-6` : `h-8 w-8 md:h-6 md:w-6`}
      `}
      ref={ref}
      {...props}
    >
      <Icon className="h-5 w-5 md:h-4 md:w-4" />
    </button>
  );
}

export const IconButton = React.forwardRef(InnerIconButton);
