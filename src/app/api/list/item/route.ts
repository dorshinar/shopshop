import { db } from "@/db/db";
import { items } from "@/db/schema";
import { NextResponse } from "next/server";
import invariant from "tiny-invariant";
import { eq } from "drizzle-orm/expressions";

// export const runtime = "experimental-edge";

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

  let existingItem = await db.select().from(items).where(eq(items.name, item));

  if (existingItem[0]) {
    await db.update(items).set({ checked: false }).where(eq(items.name, item));
    return NextResponse.json({ newItem: existingItem[0] }, { status: 200 });
  }

  await db.insert(items).values({ name: item });
  let newItem = await db.select().from(items).where(eq(items.name, item));
  return NextResponse.json({ newItem }, { status: 200 });
}
