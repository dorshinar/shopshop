import { Header } from "@/components/header";
import { db } from "@/db/db";
import { items as itemsTable } from "@/db/schema";
import { ListsWrapper } from "@/components/lists-wrapper";
import { Suspense } from "react";

export default async function Home() {
  const items = db.select().from(itemsTable).orderBy(itemsTable.name);

  return (
    <>
      <Header>
        <span aria-hidden="true">🛒</span> My Fucking Shopping List
      </Header>
      <main className="flex flex-col items-center justify-center py-6 px-4 sm:px-8">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <Suspense fallback={<div className="text-slate-500">Loading...</div>}>
            <ListsWrapper itemsPromise={items}></ListsWrapper>
          </Suspense>
        </div>
      </main>
    </>
  );
}

export const revalidate = 0;
