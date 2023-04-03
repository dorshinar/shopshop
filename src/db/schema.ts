import { InferModel } from "drizzle-orm";
import {
  boolean,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const items = mysqlTable(
  "items",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    checked: boolean("checked").notNull().default(false),
    recurring: boolean("recurring").notNull().default(false),
  },
  (items) => ({ nameIndex: uniqueIndex("name_idx").on(items.name) })
);

export type Item = InferModel<typeof items>;
