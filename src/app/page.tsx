import { AddItem } from "@/components/add-item";
import { Header } from "@/components/header";
import Separator from "@/components/separator";
import { RestoreRecurring } from "@/components/restore-recurring";
import { db } from "@/db/db";
import { items } from "@/db/schema";
import { ListsWrapper } from "@/components/lists-wrapper";

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
