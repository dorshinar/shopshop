import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`cursor-pointer flex items-center rounded-lg bg-sky-500 px-4 py-2 text-white font-medium shadow-sm outline-offset-4 outline-sky-600 transition-all hover:bg-sky-600 hover:shadow-md active:scale-[0.98] focus-visible:outline-1`}
      {...props}
    ></button>
  );
}
