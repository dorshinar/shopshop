import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  title: "Shop Shop",
  description: "My private shopping cart",
  icons: {
    icon: [
      { url: "favicon.ico", sizes: "any" },
      { url: "favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-167.png", sizes: "167x167", type: "image/png" },
      { url: "/apple-touch-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

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
          "min-h-full bg-gradient-to-b bg-fixed from-slate-100 to-slate-200 font-sans antialiased w-full text-slate-800 accent-sky-600 dark:from-slate-900 dark:to-slate-800 dark:text-slate-50 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]",
          fontSans.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
