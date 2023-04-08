"use client";
import { SSRProvider } from "react-aria";

export function Providers({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) {
  return <SSRProvider>{children}</SSRProvider>;
}
