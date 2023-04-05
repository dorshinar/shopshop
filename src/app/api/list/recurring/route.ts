import { db } from "@/db/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export async function POST() {
  await db
    .update(items)
    .set({ checked: false })
    .where(eq(items.recurring, true));

  return new Response(undefined, { status: 200 });
}
