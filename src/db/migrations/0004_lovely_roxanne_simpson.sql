CREATE TABLE IF NOT EXISTS "prod_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	"recurring" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "prod_name_idx" ON "prod_items" ("name");