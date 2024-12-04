import { boolean, pgTableCreator, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

const pgTable = pgTableCreator(
  (name) => `${process.env.POSTGRES_PREFIX}${name}`,
);

export const items = pgTable("items", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 256 }).notNull().unique(),
  checked: boolean("checked").notNull().default(false),
  recurring: boolean("recurring").notNull().default(false),
});

export type Item = typeof items.$inferSelect;
