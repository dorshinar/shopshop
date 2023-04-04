import { db } from "@/db/db";
import { items } from "@/db/schema";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const getItems = async () => {
  return db.select().from(items);
};

export default async function Home() {
  const items = await getItems();

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
