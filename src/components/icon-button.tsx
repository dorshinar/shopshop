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
      className={`cursor-pointer grid place-items-center rounded outline-offset-2 outline-sky-600 focus-visible:outline-1 
        ${size === "large" ? `h-11 w-11 md:h-4 md:w-4` : ``} 
      `}
      ref={ref}
      {...props}
    >
      <Icon className="h-6 w-6 md:h-4 md:w-4" />
    </button>
  );
}

export const IconButton = React.forwardRef(InnerIconButton);
