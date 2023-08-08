CREATE TABLE `daily` (
	`id` varchar(36) NOT NULL,
	`channelId` varchar(36) NOT NULL,
	`messages` int NOT NULL,
	`byUser` json NOT NULL,
	`byBadge` json NOT NULL,
	`day` date NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `daily_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `message` MODIFY COLUMN `timestamp` timestamp;--> statement-breakpoint
ALTER TABLE `role` ADD `updated_at` timestamp;--> statement-breakpoint
ALTER TABLE `role` DROP COLUMN `password`;