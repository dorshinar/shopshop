"use client";

import { Item } from "@/db/schema";
import { ListItem } from "./list-item";

interface Props {
  items: Item[];
}

export function ListsWrapper({
  items,
  children,
}: React.PropsWithChildren<Props>) {
  let checked = items.filter((item) => item.checked);
  let unchecked = items.filter((item) => !item.checked);

  return (
    <>
      <ul className="mt-1 w-full">
        {unchecked.map((item) => (
          <ListItem key={item.id} item={item}></ListItem>
        ))}
      </ul>

      {children}

      <ul className="mt-1 w-full">
        {checked.map((item) => (
          <ListItem key={item.id} item={item}></ListItem>
        ))}
      </ul>
    </>
  );
}
