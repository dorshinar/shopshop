"use client";

import {
  ComboBox,
  ComboBoxProps,
  ItemProps,
  ListBox,
  Popover,
  Item as ReactAriaItem,
  Input as ReactAriaInput,
} from "react-aria-components";
import React from "react";
import Input from "./input";
import { Item } from "@/db/schema";

interface MyComboBoxProps<T extends object> extends ComboBoxProps<T> {
  label?: string;
  name?: string;
  options: Item[];
}

function Combobox2_Ref<T extends object>(
  { label, name, children, options, ...props }: MyComboBoxProps<T>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <ComboBox
      {...props}
      aria-label={label}
      allowsCustomValue
      className="relative grow"
    >
      <Input
        name={name}
        ref={ref}
        as={ReactAriaInput}
        dir="auto"
        autoComplete="off"
        fullWidth
        textEllipsis
        border
      />
      <Popover>
        <ListBox className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800">
          {options.map((option) => (
            <Item key={option.id}>{option.name}</Item>
          ))}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

function Item(props: ItemProps) {
  return (
    <ReactAriaItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `flex flex-row-reverse p-2 text-slate-800 dark:text-slate-50
        ${
          isFocused
            ? "bg-slate-300 dark:bg-sky-300 dark:text-slate-800"
            : isSelected
            ? "bg-slate-200 dark:bg-sky-500"
            : "dark:bg-slate-700"
        }
    `
      }
    />
  );
}

export const Combobox2 = React.forwardRef(Combobox2_Ref);
