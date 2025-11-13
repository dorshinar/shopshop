import { startTransition, useRef } from "react";
import { Item } from "@/db/schema";
import { IconButton } from "./icon-button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Combobox } from "./combobox";
import { insertItem } from "@/api/actions";
import { createId } from "@paralleldrive/cuid2";

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

        const formData = new FormData(e.currentTarget);

        startTransition(() => {
          onItemAdded({
            id: createId(),
            name: formData.get("item")?.toString() ?? "",
            checked: false,
            recurring: false,
          });
        });
        await insertItem(formData);

        formRef.current?.reset();
      }}
      ref={formRef}
      className="mt-1 w-full"
    >
      <div className="flex items-center gap-2">
        <span className="min-h-11 min-w-11 md:min-h-4 md:min-w-4"></span>
        <span className="min-h-11 min-w-11 md:min-h-4 md:min-w-4"></span>
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
