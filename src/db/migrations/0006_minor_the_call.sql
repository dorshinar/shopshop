ALTER TABLE "prod_items" DROP CONSTRAINT "prod_items_cuid_unique";--> statement-breakpoint
ALTER TABLE "prod_items" DROP COLUMN IF EXISTS "cuid";