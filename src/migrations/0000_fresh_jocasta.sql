CREATE TABLE `items` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL,
	`checked` boolean NOT NULL DEFAULT false,
	`recurring` boolean NOT NULL DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX name_idx ON items (`name`);