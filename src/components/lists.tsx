import type { List } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { TrashIcon } from "@radix-ui/react-icons";

interface Props {
  lists: List[];
}

export function Lists({ lists }: Props) {
  return (
    <ul className="grid w-full grid-cols-[repeat(auto-fit,_minmax(160px,1fr))] gap-4">
      {lists.map((list) => (
        <li
          key={list.id}
          className="rounded border border-slate-800 dark:border-slate-50"
        >
          <Link
            className="line-h grid place-items-center overflow-hidden text-ellipsis whitespace-nowrap px-4 pt-7"
            to={`list/${encodeURIComponent(list.name)}`}
            prefetch="intent"
          >
            {list.name}
          </Link>
          <Form method="post" replace className="mb-1 h-6 md:h-4">
            <input type="hidden" name="_action" value="delete"></input>
            <input type="hidden" name="id" value={list.id}></input>
            <button aria-label={`delete list ${list.name}`}>
              <TrashIcon
                aria-hidden="true"
                className="h-6 w-6 transition-opacity md:h-4 md:w-4"
              ></TrashIcon>
            </button>
          </Form>
        </li>
      ))}
      <li className="rounded border border-slate-800 dark:border-slate-50">
        <Link
          className="line-h grid w-full place-items-center overflow-hidden text-ellipsis whitespace-nowrap px-4 pb-7 pt-7"
          to="?showAddList=true"
        >
          + Add List
        </Link>
      </li>
    </ul>
  );
}
