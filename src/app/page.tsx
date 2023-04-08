import { AddItem } from "@/components/add-item";
import { Header } from "@/components/header";
import { ListItem } from "@/components/list-item";
import Separator from "@/components/separator";
import { RestoreRecurring } from "@/components/restore-recurring";
import { db } from "@/db/db";
import { items } from "@/db/schema";

const getItems = async () => {
  return db.select().from(items);
};

export default async function Home() {
  const items = await getItems();

  const checked = items.filter((item) => item.checked);
  const unchecked = items.filter((item) => !item.checked);

  return (
    <>
      <Header>
        <span aria-hidden="true">🛒</span> List Name TODO
        {/* {list.name} */}
      </Header>
      <main className="flex flex-col items-center justify-center py-4 px-8">
        <ul className="w-full">
          {unchecked?.map((item) => (
            <ListItem key={item.id} item={item}></ListItem>
          ))}
          {/* {showNewItemName ? (
            <ListItem
              item={{
                name: newItemName.toString(),
                id: "",
                checked: false,
                recurring: false,
                order: -1,
                listId: list.id,
              }}
              onEnter={() => inputRef.current?.focus()}
              disabled
            ></ListItem>
          ) : undefined} */}
        </ul>

        <AddItem items={items} />

        <Separator></Separator>

        <p className="mt-2 w-full text-sm text-slate-600 dark:text-slate-300">
          Checked items:
        </p>

        <ul className="mt-1 w-full">
          {checked?.map((item) => (
            <ListItem key={item.id} item={item}></ListItem>
          ))}
        </ul>

        <RestoreRecurring />
      </main>
    </>
  );
}

export const runtime = "experimental-edge";
export const revalidate = 0;
