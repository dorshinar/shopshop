import { Header } from "@/components/header";
import { db } from "@/db/db";
import { items as itemsTable } from "@/db/schema";
import { ListsWrapper } from "@/components/lists-wrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export default async function Home() {
  const items = db.select().from(itemsTable);

  return (
    <>
      <Header>
        <span aria-hidden="true">🛒</span> My Fucking Shopping List
      </Header>
      <main className="flex flex-col items-center justify-center py-4 px-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ListsWrapper itemsPromise={items}></ListsWrapper>
        </Suspense>
      </main>
    </>
  );
}

export const revalidate = 0;

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
