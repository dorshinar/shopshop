"use client";

import { useRef, useState, useTransition } from "react";
import { Checkbox } from "./checkbox";
import { Combobox } from "./combobox";
import { Item } from "@/db/schema";
import { useRouter } from "next/navigation";

interface Props {
  items: Item[];
}

export function AddItem({ items }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    formRef.current?.reset();
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit} ref={formRef} className="mb-4 mt-1 w-full">
      <div className="flex items-center gap-2">
        <span className="min-h-[2.75rem] min-w-[2.75rem] md:min-h-[1rem] md:min-w-[1rem]"></span>
        <span className="min-h-[2.75rem] min-w-[2.75rem] md:min-h-[1rem] md:min-w-[1rem]"></span>
        <Combobox name="item" ref={inputRef} options={items ?? []}></Combobox>
        <Checkbox disabled aria-hidden="true"></Checkbox>
      </div>
    </form>
  );
}
