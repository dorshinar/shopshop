import { connection, db } from "@/db/db";
import { items } from "@/db/schema";
import { sql } from "drizzle-orm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const getItems = async () => {
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
    return items;
  } catch (e) {
    console.error(e);
  }
};

export default async function Home() {
  const items = await getItems();

  return (
    <div>
      {/* {items.rows.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))} */}
    </div>
  );
}
