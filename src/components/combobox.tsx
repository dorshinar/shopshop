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
      onChange={(value: string | undefined) => setQuery(value ?? "")}
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
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800">
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
          className={`flex flex-row-reverse p-2 text-slate-800 dark:text-slate-50
            ${
              active
                ? "bg-slate-300 dark:bg-sky-300 dark:text-slate-800"
                : selected
                  ? "bg-slate-200 dark:bg-sky-500"
                  : "dark:bg-slate-700"
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
