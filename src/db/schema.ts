import {
  boolean,
  pgTableCreator,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator(
  (name) => `${process.env.POSTGRES_PREFIX}${name}`,
);

export const items = pgTable(
  "items",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    checked: boolean("checked").notNull().default(false),
    recurring: boolean("recurring").notNull().default(false),
  },
  (items) => ({ nameIndex: uniqueIndex("name_idx").on(items.name) }),
);

export type Item = typeof items.$inferSelect;
