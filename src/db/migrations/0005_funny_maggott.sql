DROP INDEX IF EXISTS "prod_name_idx";--> statement-breakpoint
ALTER TABLE "prod_items" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "prod_items" ADD COLUMN "cuid" text NOT NULL;--> statement-breakpoint
ALTER TABLE "prod_items" ADD CONSTRAINT "prod_items_cuid_unique" UNIQUE("cuid");--> statement-breakpoint
ALTER TABLE "prod_items" ADD CONSTRAINT "prod_items_name_unique" UNIQUE("name");