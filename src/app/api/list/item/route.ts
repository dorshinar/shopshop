import { db } from "@/db/db";
import { items } from "@/db/schema";
import { NextResponse } from "next/server";
import invariant from "tiny-invariant";
import { eq } from "drizzle-orm/expressions";

export async function POST(request: Request) {
  let params = await request.formData();

  let item = params.get("item");
  invariant(typeof item === "string", "item name must be provided");

  if (item.length === 0) {
    return NextResponse.json(
      { errors: { item: "item name cannot be empty" } },
      { status: 400 }
    );
  }

  // console.time("getExisting");
  let existingItem = await db
    .select()
    .from(items)
    .where(eq(items.name, item))
    .limit(1);
  // console.timeEnd("getExisting");

  if (existingItem[0]) {
    await db.update(items).set({ checked: false }).where(eq(items.name, item));
    return new Response(undefined, { status: 204 });
  }

  await db.insert(items).values({ name: item });
  return new Response(undefined, { status: 204 });
}

export const config = {
  runtime: "edge",
};
