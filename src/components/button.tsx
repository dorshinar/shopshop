import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`flex items-center rounded-md bg-sky-600 px-4 py-2 text-slate-50 outline-1 outline-offset-4 outline-sky-600 transition-colors hover:bg-sky-800 focus-visible:outline`}
      {...props}
    ></button>
  );
}
