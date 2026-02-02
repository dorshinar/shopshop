import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 font-sans antialiased h-full w-full text-slate-800 accent-sky-600 dark:from-slate-900 dark:to-slate-800 dark:text-slate-50",
          fontSans.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
