CREATE TABLE "dev_items" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	"recurring" boolean DEFAULT false NOT NULL,
	CONSTRAINT "dev_items_name_unique" UNIQUE("name")
);
