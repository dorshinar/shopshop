import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("min-h-screen bg-background font-sans antialiased h-full w-full text-slate-800 accent-sky-600 dark:bg-slate-800 dark:text-slate-50", fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
