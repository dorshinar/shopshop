import { db } from "@/db/db";
import { items } from "@/db/schema";
import { NextResponse } from "next/server";
import invariant from "tiny-invariant";

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

  await db
    .insert(items)
    .values({ name: item })
    .onDuplicateKeyUpdate({ set: { checked: false } });
  return new Response(undefined, { status: 204 });
}

export const config = {
  runtime: "edge",
};
