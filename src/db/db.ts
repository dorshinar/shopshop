import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { items } from "./schema";
import { sql } from "drizzle-orm";

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

try {
  let items = await connection.execute(
    "select `id`, `name`, `checked`, `recurring` from `items`"
  );
  console.log("database-js:");
  console.log("🚀 ~ items:", items.rows);
} catch (e) {
  console.error(e);
}

try {
  console.log("ORM");
  let _items = await db.select().from(items);
  console.log("🚀 ~ _items:", _items);
} catch (e) {
  console.error(e);
}
console.log("query");
try {
  let _items = await db.execute(
    sql`select \`id\`, \`name\`, \`checked\`, \`recurring\` from \`items\``
  );
  console.log("🚀 ~ _items:", _items.rows);
} catch (e) {
  console.error(e);
}

// migrate(db, { migrationsFolder: "./src/migrations" })
//   .then(() => {
//     console.log("migration complete");
//   })
//   .catch((e) => {
//     console.error(e);
//     console.log("migration failed");
//   });
