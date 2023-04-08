import { db } from "@/db/db";
import { Item, items } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

interface Params {
  params: {
    itemId: string;
  };
}

export async function POST(request: Request, { params }: Params) {
  let newItem: Item = await request.json();
  let { itemId } = params;

  await db
    .update(items)
    .set(newItem)
    .where(eq(items.id, Number(itemId)));

  return new Response(undefined, { status: 200 });
}

export async function DELETE(request: Request, { params }: Params) {
  let { itemId } = params;

  await db.delete(items).where(eq(items.id, Number(itemId)));

  return new Response(undefined, { status: 200 });
}

export const config = {
  runtime: "edge",
};
