import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  border?: boolean;
}

function CheckboxComponent(
  { children, border = !children, defaultChecked, ...props }: Props,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      ref={ref}
      defaultChecked={defaultChecked}
      className={`rounded md:h-4 md:w-4 ${
        border ? "h-6 w-6 border" : "h-11 w-11"
      }
      outline-1 outline-offset-2 outline-sky-600 focus-visible:outline
      ${
        defaultChecked
          ? "border-neutral-400 dark:border-neutral-400"
          : "border-slate-800 dark:border-slate-50"
      }
      `}
    >
      <CheckboxPrimitive.Indicator
        forceMount={Boolean(children) || undefined}
        className="grid h-full w-full place-items-center"
      >
        {children || <CheckIcon className="h-full w-full"></CheckIcon>}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export const Checkbox = React.forwardRef(CheckboxComponent);
