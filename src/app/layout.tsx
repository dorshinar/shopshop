import { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full text-slate-800 accent-sky-600 dark:bg-slate-800 dark:text-slate-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
