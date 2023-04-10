import Input from "./input";
import { SymbolIcon, TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "./checkbox";
import { useState, useTransition } from "react";
import { Item } from "@/db/schema";
import { useRouter } from "next/navigation";
import { IconButton } from "./icon-button";

interface Props {
  item: Item;
  disabled?: boolean;
  onUpdate(id: Item["id"], newItem: Partial<Item>): void;
}

export function ListItem({ item, disabled = false, onUpdate }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  let isMutating = isPending || isFetching;

  const updateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newItem: Partial<Item> = {};

    const checkedInput = e.currentTarget.elements.namedItem("checked");
    if (checkedInput) {
      newItem.checked = (checkedInput as HTMLInputElement).checked;
    }

    const recurringInput = e.currentTarget.elements.namedItem("recurring");
    if (recurringInput) {
      newItem.recurring = (recurringInput as HTMLInputElement).checked;
    }

    const nameInput = e.currentTarget.elements.namedItem("name");
    if (nameInput) {
      newItem.name = (nameInput as HTMLInputElement).value;
    }

    onUpdate(item.id, newItem);

    setIsFetching(true);
    await fetch(`api/list/item/${item.id}`, {
      method: "POST",
      body: JSON.stringify(newItem),
    });
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  const deleteItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsDeleted(true);

    setIsFetching(true);
    await fetch(`api/list/item/${item.id}`, {
      method: "DELETE",
    });
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  if (isDeleted && isMutating) {
    return <></>;
  }

  return (
    <li
      className="mt-1 flex items-center justify-end gap-2 first:mt-0"
      aria-hidden={disabled}
    >
      <form onChange={updateItem} className="flex items-center">
        <Checkbox
          defaultChecked={item.recurring}
          name="recurring"
          aria-label={`set ${item.name} as ${
            item.recurring ? "non-recurring" : "recurring"
          }`}
          disabled={disabled}
        >
          <SymbolIcon
            className={`h-6 w-6 md:h-4 md:w-4 ${
              item.recurring ? "opacity-100" : "opacity-50"
            } transition-opacity`}
          ></SymbolIcon>
        </Checkbox>
      </form>
      <form onSubmit={deleteItem} className="flex items-center text-center">
        <IconButton
          disabled={disabled}
          aria-label={`delete ${item.name}`}
          Icon={TrashIcon}
        />
      </form>
      <form
        onChange={updateItem}
        className="grid flex-shrink-0 flex-grow basis-20 place-items-center"
      >
        <Input
          dir="auto"
          name="name"
          defaultValue={item.name}
          disabled={disabled}
          fullWidth
          textEllipsis
          autoComplete="off"
          secondary={item.checked}
          aria-label={`edit ${item.name} name`}
        ></Input>
      </form>
      <form onChange={updateItem} className="flex items-center">
        <Checkbox
          defaultChecked={item.checked}
          name="checked"
          aria-label={`toggle ${item.name} ${
            item.checked ? "unchecked" : "checked"
          }`}
          disabled={disabled}
          border
        ></Checkbox>
      </form>
    </li>
  );
}
