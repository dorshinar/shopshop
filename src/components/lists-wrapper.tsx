"use client";

import { Item } from "@/db/schema";
import { ListItem } from "./list-item";
import { startTransition, use, useOptimistic } from "react";
import { AddItem } from "./add-item";
import { restoreRecurring, undoRestoreRecurring } from "@/api/actions";
import { Button } from "./button";
import Separator from "./separator";
import { toast } from "sonner";

type OptimisticUpdate =
  | { type: "removeAll" | "restore" }
  | {
      type: "add" | "remove" | "update";
      item: Item;
    };

interface Props {
  itemsPromise: Promise<Item[]>;
}

export function ListsWrapper({ itemsPromise }: Props) {
  const items = use(itemsPromise);

  let [unchecked, updateUncheckedOptimistic] = useOptimistic(
    items.filter((item) => !item.checked),
    (items, update: OptimisticUpdate) => {
      if (update.type === "removeAll") {
        return [];
      } else if (update.type === "add") {
        return [...items, update.item];
      } else if (update.type === "update") {
        return items.map((item) => {
          if (item.id === update.item.id) {
            return update.item;
          }

          return item;
        });
      } else if (update.type === "remove") {
        return items.filter((item) => item.id !== update.item.id);
      }

      return items;
    },
  );
  let [checked, updateCheckedOptimistic] = useOptimistic(
    items.filter((item) => item.checked),
    (items, update: OptimisticUpdate) => {
      if (update.type === "add") {
        return [...items, update.item];
      } else if (update.type === "update") {
        return items.map((item) => {
          if (item.id === update.item.id) {
            return update.item;
          }

          return item;
        });
      } else if (update.type === "remove") {
        return items.filter((item) => item.id !== update.item.id);
      } else if (update.type === "restore") {
        return items.filter((item) => !item.recurring);
      }

      return items;
    },
  );

  function onItemChecked(item: Item) {
    updateUncheckedOptimistic({ item, type: "remove" });
    updateCheckedOptimistic({ item: { ...item, checked: true }, type: "add" });
  }

  function onItemUnchecked(item: Item) {
    updateUncheckedOptimistic({
      item: { ...item, checked: false },
      type: "add",
    });
    updateCheckedOptimistic({ item, type: "remove" });
  }

  return (
    <>
      <ul className="mt-1 w-full">
        {unchecked.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onItemChecked={onItemChecked}
            onItemDeleted={(item) => {
              updateUncheckedOptimistic({
                item: item,
                type: "remove",
              });
            }}
            onItemRecurringUpdated={(item) => {
              updateUncheckedOptimistic({
                item: { ...item, recurring: !item.recurring },
                type: "update",
              });
            }}
            onItemNameUpdated={(item) => {
              updateCheckedOptimistic({
                item: item,
                type: "update",
              });
            }}
          ></ListItem>
        ))}
      </ul>

      <AddItem
        items={items}
        onItemAdded={(item) => updateUncheckedOptimistic({ item, type: "add" })}
      />
      <div className="flex gap-2 items-center justify-center my-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const recurringItems = checked.filter((item) => item.recurring);

            startTransition(() => {
              updateCheckedOptimistic({ type: "restore" });
              recurringItems.forEach((item) => {
                updateUncheckedOptimistic({
                  item: { ...item, checked: false },
                  type: "add",
                });
              });
            });

            const restoredItemIds = await restoreRecurring();

            toast.success("Recurring items restored", {
              action: {
                label: "Undo",
                onClick: async () => {
                  startTransition(() => {
                    updateUncheckedOptimistic({ type: "restore" });
                    recurringItems.forEach((item) => {
                      updateCheckedOptimistic({
                        item: { ...item, checked: true },
                        type: "add",
                      });
                    });
                  });
                  await undoRestoreRecurring(restoredItemIds);
                },
              },
            });
          }}
        >
          <Button>Restore recurring</Button>
        </form>
      </div>
      <Separator></Separator>
      <p className="mt-3 w-full text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        Checked items
      </p>

      <ul className="mt-1 w-full">
        {checked.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onItemChecked={onItemUnchecked}
            onItemDeleted={(item) => {
              updateCheckedOptimistic({ item, type: "remove" });
            }}
            onItemRecurringUpdated={(item) => {
              updateCheckedOptimistic({
                item: { ...item, recurring: !item.recurring },
                type: "update",
              });
            }}
            onItemNameUpdated={(item) => {
              updateCheckedOptimistic({
                item: item,
                type: "update",
              });
            }}
          ></ListItem>
        ))}
      </ul>
    </>
  );
}
