import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full text-slate-800 accent-sky-600 dark:bg-slate-800 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}
