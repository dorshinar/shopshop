import React, { Fragment, useState } from "react";
import { Combobox as ComboboxBase, Transition } from "@headlessui/react";
import type { Item } from "@prisma/client";
import Input from "./input";

interface ComboboxProps {
  options: Item[];
  inputProps: React.ComponentPropsWithRef<typeof Input>;
}

function ComboboxComponent(
  { options, inputProps }: ComboboxProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  const filtered = options.filter((option) => option.name.includes(query));
  const filteredContainsQuery = Boolean(
    filtered.find((item) => item.name === query)
  );

  return (
    <>
      <ComboboxBase
        value={selected}
        onChange={(value) => {
          setSelected(value);
          setQuery(value);
        }}
        name="item"
      >
        <div className="relative grow">
          <ComboboxBase.Input
            onChange={(event) => setQuery(event.target.value)}
            as={Input}
            ref={ref}
            {...inputProps}
            dir="auto"
            autoComplete="off"
          ></ComboboxBase.Input>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <ComboboxBase.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800">
              {query.length > 0 && !filteredContainsQuery && (
                <Option value={query} />
              )}
              {filtered.map((option) => (
                <Option value={option.name} key={option.id}></Option>
              ))}
            </ComboboxBase.Options>
          </Transition>
        </div>
      </ComboboxBase>
    </>
  );
}

function Option({ value }: { value: string }) {
  return (
    <ComboboxBase.Option value={value} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={`flex flex-row-reverse p-2 text-slate-800 dark:bg-slate-700 dark:text-slate-50
            ${
              active
                ? "bg-slate-300 dark:bg-sky-300 dark:text-slate-800"
                : selected && "bg-slate-200 dark:bg-sky-500"
            }
        `}
        >
          {value}
        </li>
      )}
    </ComboboxBase.Option>
  );
}

export const Combobox = React.forwardRef(ComboboxComponent);
