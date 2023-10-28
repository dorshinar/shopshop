import Input from "./input";
import { SymbolIcon, TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "./checkbox";
import { Item } from "@/db/schema";
import { IconButton } from "./icon-button";
import { checkItem, deleteItem, updateRecurring } from "@/api/actions";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  item: Item;
  disabled?: boolean;
  onItemChecked?(id: Item["id"]): void;
  onItemDeleted?(id: Item["id"]): void;
}

export function ListItem({
  item,
  disabled = false,
  onItemChecked,
  onItemDeleted,
}: Props) {
  const _updateItem = () => {};
  const router = useRouter();

  if (!item) {
    return null;
  }

  return (
    <li
      className="mt-1 flex items-center justify-end gap-2 first:mt-0"
      aria-hidden={disabled}
    >
      <form
        action={updateRecurring}
        onSubmit={async (e) => {
          e.preventDefault();
          await updateRecurring(new FormData(e.currentTarget));

          startTransition(() => {
            router.refresh();
          });
        }}
        className="flex items-center"
      >
        <input type="hidden" value={item.id} name="id" />
        <Checkbox
          defaultChecked={item.recurring}
          name="recurring"
          aria-label={`set ${item.name} as ${
            item.recurring ? "non-recurring" : "recurring"
          }`}
          disabled={disabled}
          className="group"
          type="submit"
        >
          <SymbolIcon
            className={cn(
              "h-6 w-6 md:h-4 md:w-4",
              "group-data-[state='checked']:opacity-100 group-data-[state='unchecked']:opacity-50",
              "transition-opacity"
            )}
          ></SymbolIcon>
        </Checkbox>
      </form>
      <form
        action={deleteItem}
        onSubmit={async (e) => {
          e.preventDefault();
          startTransition(() => {
            onItemDeleted?.(item.id);
          });

          await deleteItem(new FormData(e.currentTarget));
        }}
        className="flex items-center text-center"
      >
        <input type="hidden" value={item.id} name="id" />
        <IconButton
          disabled={disabled}
          aria-label={`delete ${item.name}`}
          Icon={TrashIcon}
          name="id"
          value={item.id}
        />
      </form>
      <form
        onChange={_updateItem}
        className="grid flex-shrink-0 flex-grow basis-20 place-items-center"
      >
        <input type="hidden" value={item.id} name="id" />
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
      <form
        action={checkItem}
        onSubmit={async (e) => {
          e.preventDefault();

          // startTransition(() => {
          onItemChecked?.(item.id);
          // });

          await checkItem(new FormData(e.currentTarget));
        }}
        className="flex items-center"
      >
        <input type="hidden" value={item.id} name="id" />
        <Checkbox
          defaultChecked={item.checked}
          name="checked"
          aria-label={`toggle ${item.name} ${
            item.checked ? "unchecked" : "checked"
          }`}
          disabled={disabled}
          type="submit"
          border
        ></Checkbox>
      </form>
    </li>
  );
}
