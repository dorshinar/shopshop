import { AddItem } from "@/components/add-item";
import { Header } from "@/components/header";
import Separator from "@/components/separator";
import { RestoreRecurring } from "@/components/restore-recurring";
import { db } from "@/db/db";
import { items } from "@/db/schema";
import { ListsWrapper } from "@/components/lists-wrapper";
import { Metadata } from "next";

const getItems = async () => {
  return db.select().from(items);
};

export default async function Home() {
  const items = await getItems();

  return (
    <>
      <Header>
        <span aria-hidden="true">🛒</span> My Fucking Shopping List
      </Header>
      <main className="flex flex-col items-center justify-center py-4 px-8">
        <ListsWrapper items={items}>
          <AddItem items={items} />

          <Separator></Separator>

          <p className="mt-2 w-full text-sm text-slate-600 dark:text-slate-300">
            Checked items:
          </p>
        </ListsWrapper>

        <RestoreRecurring />
      </main>
    </>
  );
}

export const runtime = "experimental-edge";
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
