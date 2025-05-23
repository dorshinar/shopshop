import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  border?: boolean;
}

function CheckboxComponent(
  { children, border = !children, defaultChecked, className, ...props }: Props,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      ref={ref}
      defaultChecked={defaultChecked}
      className={cn(
        "cursor-pointer rounded-sm md:h-4 md:w-4",
        border ? "h-6 w-6 border" : "h-11 w-11",
        "outline-offset-2 outline-sky-600 focus-visible:outline-1",
        "data-[state='checked']:border-neutral-400 dark:data-[state='checked']:border-neutral-400 data-[state='unchecked']:border-slate-800 dark:data-[state='unchecked']:border-slate-50",
        className,
      )}
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
