import { startTransition, useRef } from "react";
import { Item } from "@/db/schema";
import { IconButton } from "./icon-button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Combobox } from "./combobox";
import { insertItem } from "@/api/actions";

interface Props {
  items: Item[];
  onItemAdded(item: Item): void;
}

export function AddItem({ items, onItemAdded }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action={insertItem}
      onSubmit={async (e) => {
        e.preventDefault();
        formRef.current?.reset();

        const formData = new FormData(e.currentTarget);

        startTransition(() => {
          onItemAdded({
            id: Math.random(),
            name: formData.get("item")?.toString() ?? "",
            checked: false,
            recurring: false,
          });
        });
        await insertItem(formData);
      }}
      ref={formRef}
      className="mt-1 w-full"
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
