CREATE TABLE `role` (
	`id` varchar(36) NOT NULL,
	`name` varchar(36) NOT NULL,
	`level` int NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp,
	CONSTRAINT `role_id` PRIMARY KEY(`id`),
	CONSTRAINT `role_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`username` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `message` DROP CONSTRAINT `message_username_unique`;--> statement-breakpoint
ALTER TABLE `channel` MODIFY COLUMN `created_at` timestamp;--> statement-breakpoint
ALTER TABLE `channel` MODIFY COLUMN `updated_at` timestamp;