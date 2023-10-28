import Button from "./button";
import { restoreRecurring } from "@/api/actions";

export function RestoreRecurring() {
  return (
    <form action={restoreRecurring} className="mt-4">
      <Button>Restore recurring</Button>
    </form>
  );
}
