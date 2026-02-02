import Input from "./input";
import { SymbolIcon, TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "./checkbox";
import { Item } from "@/db/schema";
import { IconButton } from "./icon-button";
import {
  checkItem,
  deleteItem,
  updateName,
  updateRecurring,
} from "@/api/actions";
import { startTransition } from "react";
import { cn } from "@/lib/utils";

interface Props {
  item: Item;
  disabled?: boolean;
  onItemChecked(item: Item): void;
  onItemDeleted(item: Item): void;
  onItemRecurringUpdated(item: Item): void;
  onItemNameUpdated(item: Item): void;
}

export function ListItem({
  item,
  disabled = false,
  onItemChecked,
  onItemDeleted,
  onItemRecurringUpdated,
  onItemNameUpdated,
}: Props) {
  if (!item) {
    return null;
  }

  return (
    <li
      className="mt-1 flex items-center justify-end gap-2 first:mt-0 p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      aria-hidden={disabled}
    >
      <form
        action={updateRecurring}
        onSubmit={async (e) => {
          e.preventDefault();
          startTransition(() => {
            onItemRecurringUpdated?.(item);
          });
          await updateRecurring(new FormData(e.currentTarget));
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
              "transition-opacity",
            )}
          ></SymbolIcon>
        </Checkbox>
      </form>
      <form
        action={deleteItem}
        onSubmit={async (e) => {
          e.preventDefault();
          startTransition(() => {
            onItemDeleted?.(item);
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
        action={updateName}
        onChange={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          startTransition(() => {
            onItemNameUpdated({
              ...item,
              name: formData.get("name")?.toString() ?? "",
            });
          });

          await updateName(formData);
        }}
        className="grid shrink-0 grow basis-20 place-items-center"
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
          startTransition(() => {
            onItemChecked?.(item);
          });
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
