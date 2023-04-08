"use client";

import { useRef, useState, useTransition } from "react";
import { Item } from "@/db/schema";
import { useRouter } from "next/navigation";
import { Combobox2 } from "./combobox2";
import { IconButton } from "./icon-button";
import { PlusIcon } from "@radix-ui/react-icons";

interface Props {
  items: Item[];
}

export function AddItem({ items }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    setIsFetching(true);
    await fetch(`api/list/item`, {
      method: "POST",
      body: formData,
    });
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });

    setKey((key) => key + 1); // Temporary, until react-aria combobox can reset input
    formRef.current?.reset();
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit} ref={formRef} className="mb-4 mt-1 w-full">
      <div className="flex items-center gap-2">
        <span className="min-h-[2.75rem] min-w-[2.75rem] md:min-h-[1rem] md:min-w-[1rem]"></span>
        <span className="min-h-[2.75rem] min-w-[2.75rem] md:min-h-[1rem] md:min-w-[1rem]"></span>
        <Combobox2
          name="item"
          ref={inputRef}
          label="add item to list"
          options={items}
          key={key}
        />
        <IconButton aria-label="add item" Icon={PlusIcon} size="small" />
      </div>
    </form>
  );
}
