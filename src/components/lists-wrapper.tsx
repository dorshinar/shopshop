"use client";

import { Item } from "@/db/schema";
import { ListItem } from "./list-item";
import { startTransition, useOptimistic } from "react";
import { AddItem } from "./add-item";
import { checkAll, restoreRecurring } from "@/api/actions";
import { Button } from "./button";
import Separator from "./separator";

type OptimisticUpdate =
  | { type: "removeAll" | "restore" }
  | {
      type: "add" | "remove" | "update";
      item: Item;
    };

interface Props {
  items: Item[];
}

export function ListsWrapper({ items }: Props) {
  let [unchecked, updateUncheckedOptimistic] = useOptimistic(
    items.filter((item) => !item.checked),
    (items, update: OptimisticUpdate) => {
      if (update.type === "removeAll") {
        return [];
      } else if (update.type === "add") {
        console.log(update);
        return [...items, update.item];
      } else if (update.type === "update") {
        return items.map((item) => {
          if (item.id === update.item.id) {
            return update.item;
          }

          return item;
        });
      }

      return items.filter((item) => item.id !== update.item.id);
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
      <div className="flex gap-2 items-center my-4">
        <form
          action={restoreRecurring}
          onSubmit={async (e) => {
            e.preventDefault();

            startTransition(() => {
              updateCheckedOptimistic({ type: "restore" });
              checked
                .filter((item) => item.recurring)
                .forEach((item) => {
                  updateUncheckedOptimistic({
                    item: { ...item, checked: false },
                    type: "add",
                  });
                });
            });

            await restoreRecurring();
          }}
        >
          <Button>Restore recurring</Button>
        </form>
        <form
          action={checkAll}
          onSubmit={async (e) => {
            e.preventDefault();

            startTransition(() => {
              updateUncheckedOptimistic({ type: "removeAll" });
              unchecked.forEach((item) => {
                updateCheckedOptimistic({
                  item: { ...item, checked: true },
                  type: "add",
                });
              });
            });

            await checkAll();
          }}
        >
          <Button>Check All</Button>
        </form>
      </div>
      <Separator></Separator>
      <p className="mt-2 w-full text-sm text-slate-600 dark:text-slate-300">
        Checked items:
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
