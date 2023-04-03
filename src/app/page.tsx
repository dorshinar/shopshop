import { connection, db } from "@/db/db";
import { items } from "@/db/schema";
import { sql } from "drizzle-orm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const getItems = async () => {
  console.log("ORM in page.tsx");
  let _items = await db.select().from(items);
  console.log("🚀 ~ _items:", _items);
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
