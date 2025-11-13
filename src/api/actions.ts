"use server";

import { db } from "@/db/db";
import { items } from "@/db/schema";
import { eq, inArray, and } from "drizzle-orm";
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
    .onConflictDoUpdate({ target: items.name, set: { checked: false } });

  revalidatePath("/");
}

export async function updateRecurring(formData: FormData) {
  await db
    .update(items)
    .set({ recurring: formData.get("recurring")?.toString() === "on" })
    .where(eq(items.id, formData.get("id")?.toString() ?? ""));

  revalidatePath("/");
}

export async function deleteItem(formData: FormData) {
  await db
    .delete(items)
    .where(eq(items.id, formData.get("id")?.toString() ?? ""));

  revalidatePath("/");
}

export async function checkItem(formData: FormData) {
  await db
    .update(items)
    .set({ checked: formData.get("checked")?.toString() === "on" })
    .where(eq(items.id, formData.get("id")?.toString() ?? ""));

  revalidatePath("/");
}

export async function updateName(formData: FormData) {
  await db
    .update(items)
    .set({ name: formData.get("name")?.toString() })
    .where(eq(items.id, formData.get("id")?.toString() ?? ""));

  revalidatePath("/");
}

export async function restoreRecurring() {
  const restoredItems = await db
    .update(items)
    .set({ checked: false })
    .where(and(eq(items.recurring, true), eq(items.checked, true)))
    .returning({ id: items.id });

  revalidatePath("/");
  return restoredItems.map((item) => item.id);
}

export async function undoRestoreRecurring(itemIds: string[]) {
  if (itemIds.length === 0) return;

  await db
    .update(items)
    .set({ checked: true })
    .where(inArray(items.id, itemIds));

  revalidatePath("/");
}
