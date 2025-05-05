import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const prod_items = pgTable("prod_items", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 256 }).notNull().unique(),
  checked: boolean("checked").notNull().default(false),
  recurring: boolean("recurring").notNull().default(false),
});

export const dev_items = pgTable("dev_items", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 256 }).notNull().unique(),
  checked: boolean("checked").notNull().default(false),
  recurring: boolean("recurring").notNull().default(false),
});

let items: typeof prod_items | typeof dev_items;
if (process.env.POSTGRES_PREFIX === "prod_") {
  items = prod_items;
} else {
  items = dev_items;
}

export { items };
export type Item = typeof items.$inferSelect;
