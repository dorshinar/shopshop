"use client";
import { useRouter } from "next/navigation";
import Button from "./button";
import { useTransition } from "react";

export function RestoreRecurring() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`api/list/recurring`, {
      method: "POST",
    });

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <Button>Restore recurring</Button>
    </form>
  );
}
