"use client";

import { Item } from "@/db/schema";
import { ListItem } from "./list-item";
import { useState } from "react";

interface Props {
  items: Item[];
}

export function ListsWrapper({
  items: itemsProp,
  children,
}: React.PropsWithChildren<Props>) {
  const [updatedItems, setUpdatedItems] = useState<
    Record<Item["id"], Partial<Item>>
  >({});

  let items = itemsProp.map((item) => ({ ...item, ...updatedItems[item.id] }));

  let checked = items.filter((item) => item.checked);
  let unchecked = items.filter((item) => !item.checked);

  const onUpdate = (id: Item["id"], item: Partial<Item>) => {
    setUpdatedItems((updated) => ({ ...updated, [id]: item }));
  };

  return (
    <>
      <ul className="mt-1 w-full">
        {unchecked.map((item) => (
          <ListItem key={item.id} item={item} onUpdate={onUpdate}></ListItem>
        ))}
      </ul>

      {children}

      <ul className="mt-1 w-full">
        {checked.map((item) => (
          <ListItem key={item.id} item={item} onUpdate={onUpdate}></ListItem>
        ))}
      </ul>
    </>
  );
}
