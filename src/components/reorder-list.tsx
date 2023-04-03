import type { Item } from "@prisma/client";
import { Form } from "@remix-run/react";
import { Reorder } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ListItem } from "./list-item";

/**
 * A component for reordering a list of items.
 *
 * @example
 * <div className="mt-4 w-full">
 *   <ReorderList
 *     items={checked}
 *     onEnter={() => inputRef.current?.focus()}
 *   ></ReorderList>
 * </div>
 *
 * @param items items list
 */
export default function ReorderList({
  items: itemsProp,
  onEnter,
}: {
  items: Item[];
  onEnter(): void;
}) {
  const reorderFormRef = useRef<HTMLFormElement>(null);
  const [items, setItems] = useState(itemsProp);

  useEffect(() => {
    setItems(itemsProp);
  }, [itemsProp]);

  /**
   * Used to trigger the form when the drag handle is released.
   */
  // const onDragFinished = useCallback(
  //   () => reorderFormRef.current?.requestSubmit(),
  //   []
  // );

  return (
    <>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="w-full"
      >
        {items?.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onEnter={onEnter}
            // onDragFinished={onDragFinished}
          ></ListItem>
        ))}
        {/* {showNewItemName ? (
        <ListItem
          item={{
            name: newItemName.toString(),
            id: "",
            checked: false,
            recurring: false,
          }}
          onEnter={onEnter}
          disabled
        ></ListItem>
      ) : undefined} */}
      </Reorder.Group>
      <Form method="post" ref={reorderFormRef} replace>
        {items.map((item) => (
          <input
            key={item.id}
            value={item.id}
            name="items"
            type="hidden"
          ></input>
        ))}
        <input type="hidden" name="_action" value="reorder"></input>
      </Form>
    </>
  );
}
