"use client";

import { useRef } from "react";
import { Item } from "@/db/schema";
import { IconButton } from "./icon-button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Combobox } from "./combobox";
import { insertItem } from "@/api/actions";

interface Props {
  items: Item[];
}

export function AddItem({ items }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action={insertItem}
      onSubmit={async (e) => {
        e.preventDefault();
        formRef.current?.reset();
        await insertItem(new FormData(e.currentTarget));
      }}
      ref={formRef}
      className="mb-4 mt-1 w-full"
    >
      <div className="flex items-center gap-2">
        <span className="min-h-[2.75rem] min-w-[2.75rem] md:min-h-[1rem] md:min-w-[1rem]"></span>
        <span className="min-h-[2.75rem] min-w-[2.75rem] md:min-h-[1rem] md:min-w-[1rem]"></span>
        <Combobox
          name="item"
          ref={inputRef}
          label="add item to list"
          options={items}
        />
        <IconButton aria-label="add item" Icon={PlusIcon} size="small" />
      </div>
    </form>
  );
}
