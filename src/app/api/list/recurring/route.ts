import { db } from "@/db/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  await db
    .update(items)
    .set({ checked: false })
    .where(eq(items.recurring, true));

  return new Response(undefined, { status: 200 });
}

export const config = {
  runtime: "edge",
};
