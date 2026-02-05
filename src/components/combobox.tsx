import React, { Fragment, useState } from "react";
import {
  Combobox as ComboboxBase,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import Input from "./input";
import { Item } from "@/db/schema";

interface ComboboxProps {
  options: Item[];
  name?: string;
  label: string;
}

function ComboboxComponent(
  { options, name, label }: ComboboxProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const [query, setQuery] = useState("");

  const filtered = options.filter((option) => option.name.includes(query));
  const filteredContainsQuery = Boolean(
    filtered.find((item) => item.name === query),
  );

  return (
    <ComboboxBase
      defaultValue={""}
      onChange={(value: string | null) => setQuery(value ?? "")}
      name={name}
    >
      <div className="relative grow">
        <ComboboxInput
          onChange={(event) => setQuery(event.target.value)}
          aria-label={label}
          as={Input}
          ref={ref}
          dir="auto"
          autoComplete="off"
          fullWidth
          textEllipsis
          border
        ></ComboboxInput>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <ComboboxOptions className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 dark:bg-slate-800 z-10">
            {query.length > 0 && !filteredContainsQuery && (
              <Option value={query} />
            )}
            {filtered.map((option) => (
              <Option value={option.name} key={option.id}></Option>
            ))}
          </ComboboxOptions>
        </Transition>
      </div>
    </ComboboxBase>
  );
}

function Option({ value }: { value: string }) {
  return (
    <ComboboxOption value={value} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={`flex flex-row-reverse px-3 py-2 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors
            ${
              active
                ? "bg-sky-50 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300"
                : selected
                  ? "bg-slate-100 dark:bg-slate-700"
                  : ""
            }
        `}
        >
          {value}
        </li>
      )}
    </ComboboxOption>
  );
}

export const Combobox = React.forwardRef(ComboboxComponent);
