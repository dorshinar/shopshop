import Link from "next/link";
import React from "react";

export function Header({ children }: React.PropsWithChildren) {
  return (
    <Link href="/">
      <h1 className="flex bg-slate-100 p-4 text-xl dark:bg-slate-700">
        <span className="rounded-sm px-2 dark:text-slate-50">{children}</span>
      </h1>
    </Link>
  );
}
