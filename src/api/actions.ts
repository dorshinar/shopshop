"use server";

import { db } from "@/db/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import invariant from "tiny-invariant";

export async function insertItem(formData: FormData) {
  let item = formData.get("item");
  invariant(typeof item === "string", "item name must be provided");

  if (item.length === 0) {
    throw new Error("item name cannot be empty");
  }

  await db
    .insert(items)
    .values({ name: item })
    .onDuplicateKeyUpdate({ set: { checked: false } });

  revalidatePath("/");
}

export async function updateRecurring(formData: FormData) {
  await db
    .update(items)
    .set({ recurring: formData.get("recurring")?.toString() === "on" })
    .where(eq(items.id, Number(formData.get("id"))));

  revalidatePath("/");
}

export async function deleteItem(formData: FormData) {
  await db.delete(items).where(eq(items.id, Number(formData.get("id"))));

  revalidatePath("/");
}

export async function checkItem(formData: FormData) {
  await db
    .update(items)
    .set({ checked: formData.get("checked")?.toString() === "on" })
    .where(eq(items.id, Number(formData.get("id"))));

  revalidatePath("/");
}

export async function updateName(formData: FormData) {
  await db
    .update(items)
    .set({ name: formData.get("name")?.toString() })
    .where(eq(items.id, Number(formData.get("id"))));

  revalidatePath("/");
}

export async function restoreRecurring() {
  await db
    .update(items)
    .set({ checked: false })
    .where(eq(items.recurring, true));

  revalidatePath("/");
}

export async function checkAll() {
  await db.update(items).set({ checked: true });

  revalidatePath("/");
}
