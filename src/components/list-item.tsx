import type { Item } from "@prisma/client";
import { useSubmit, useActionData, Form } from "@remix-run/react";
import type ShoppingListItemsResponse from "~/entities/ShoppingListItemsResponse";
import Input from "./input";
import { SymbolIcon, TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "./checkbox";
import { useRef } from "react";

export function ListItem({
  item,
  // onDragFinished,
  disabled = false,
  onEnter,
}: {
  item: Item;
  // onDragFinished(e: React.PointerEvent): void;
  disabled?: boolean;
  onEnter(): void;
}) {
  const submit = useSubmit();
  const actionData = useActionData<ShoppingListItemsResponse>();
  const lastRecurringItemId = actionData?.recurringCheckedItemId;
  const lastCheckedItemId = actionData?.checkedItemId;

  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // const controls = useDragControls();

  return (
    <li
      className="mt-1 flex items-center justify-end gap-2 first:mt-0"
      aria-hidden={disabled}
      // value={item}
      // dragListener={false}
      // dragControls={controls}
    >
      <Form
        method="post"
        onChange={(event) => submit(event.currentTarget, { replace: true })}
        className="flex items-center"
        replace
      >
        <Checkbox
          defaultChecked={item.recurring ?? false}
          name="recurring"
          aria-label={`set ${item.name} as ${
            item.recurring ? "non-recurring" : "recurring"
          }`}
          ref={
            item.id === lastRecurringItemId
              ? (node) => node?.focus()
              : undefined
          }
          disabled={disabled}
        >
          <SymbolIcon
            className={`h-6 w-6 md:h-4 md:w-4 ${
              item.recurring ? "opacity-100" : "opacity-50"
            } transition-opacity`}
          ></SymbolIcon>
        </Checkbox>
        <input type="hidden" name="id" value={item.id}></input>
        <input type="hidden" name="_action" value="recurring"></input>
      </Form>
      <Form method="post" className="flex items-center text-center" replace>
        <input type="hidden" name="id" value={item.id}></input>
        <button
          name="_action"
          value="delete"
          disabled={disabled}
          aria-label={`delete ${item.name}`}
          className="grid h-11 w-11 place-items-center rounded outline-1 outline-offset-2 outline-sky-600 focus-visible:outline md:h-4 md:w-4"
          ref={deleteButtonRef}
        >
          <TrashIcon className="h-6 w-6 md:h-4 md:w-4"></TrashIcon>
        </button>
      </Form>
      <Form
        method="post"
        replace
        className="grid flex-shrink-0 flex-grow basis-20 place-items-center"
        onChange={(event) => submit(event.currentTarget, { replace: true })}
      >
        <Input
          dir="auto"
          name="name"
          defaultValue={item.name}
          disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onEnter();
            }
            if (event.key === "Backspace" && event.currentTarget.value === "") {
              deleteButtonRef.current?.click();
            }
          }}
          fullWidth
          textEllipsis
          autoComplete="off"
          secondary={item.checked}
          aria-label={`edit ${item.name} name`}
        ></Input>
        <input type="hidden" name="id" value={item.id}></input>
        <input type="hidden" name="_action" value="name"></input>
      </Form>
      <Form
        method="post"
        onChange={(event) => submit(event.currentTarget, { replace: true })}
        className="flex items-center"
        replace
      >
        <Checkbox
          defaultChecked={item.checked ?? false}
          name="checked"
          aria-label={`toggle ${item.name} ${
            item.checked ? "unchecked" : "checked"
          }`}
          ref={
            item.id === lastCheckedItemId ? (node) => node?.focus() : undefined
          }
          disabled={disabled}
          border
        ></Checkbox>
        <input type="hidden" name="id" value={item.id}></input>
        <input type="hidden" name="_action" value="check"></input>
      </Form>
    </li>
  );
}
