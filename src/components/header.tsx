import Link from "next/link";
import React from "react";

export function Header({ children }: React.PropsWithChildren) {
  return (
    <Link href="/">
      <h1 className="flex bg-white/80 backdrop-blur-sm p-4 text-xl font-semibold shadow-sm dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
        <span className="rounded-sm px-2 text-slate-700 dark:text-slate-50">
          {children}
        </span>
      </h1>
    </Link>
  );
}
