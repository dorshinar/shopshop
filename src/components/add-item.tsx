"use client";

import { useRef, useState, useTransition } from "react";
import { Item } from "@/db/schema";
import { useRouter } from "next/navigation";
import { IconButton } from "./icon-button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Combobox } from "./combobox";
import { ListItem } from "./list-item";

interface Props {
  items: Item[];
}

export function AddItem({ items }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [newItemNames, setNewItemNames] = useState<string[]>([]);

  const isMutating = isFetching || isPending;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let name = formData.get("item");
    if (typeof name === "string") {
      setNewItemNames((names) => [...names, name as string]);
    }

    formRef.current?.reset();
    inputRef.current?.focus();

    setIsFetching(true);
    await fetch(`api/list/item`, {
      method: "POST",
      body: formData,
    });
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
      setNewItemNames((names) => [...names].filter((n) => n !== name));
    });
  };

  return (
    <>
      {isMutating ? (
        <div className="w-full mt-1">
          {newItemNames.map((name) => (
            <ListItem
              item={{
                name,
                id: -1,
                checked: false,
                recurring: false,
              }}
              disabled
              key={name}
              onUpdate={() => {}}
            ></ListItem>
          ))}
        </div>
      ) : undefined}
      <form onSubmit={onSubmit} ref={formRef} className="mb-4 mt-1 w-full">
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
    </>
  );
}
