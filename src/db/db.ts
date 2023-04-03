import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { items } from "./schema";

let origFetch = global.fetch;

global.fetch = (...args) => {
  console.log(args[1]!!.body);

  return origFetch(...args);
};

export const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME_DEV"],
  password: process.env["DATABASE_PASSWORD_DEV"],
});

export const db = drizzle(connection);

console.log("ORM in db.ts");
let _items = await db.select().from(items);
console.log("🚀 ~ _items:", _items);

// migrate(db, { migrationsFolder: "./src/migrations" })
//   .then(() => {
//     console.log("migration complete");
//   })
//   .catch((e) => {
//     console.error(e);
//     console.log("migration failed");
//   });
