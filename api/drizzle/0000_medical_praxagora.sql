CREATE TABLE `folders` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`owner_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`owner_id` text,
	`folder_id` text,
	`url` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`folder_id`) REFERENCES `folders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password` text,
	`avatar_url` text,
	`oauth_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
