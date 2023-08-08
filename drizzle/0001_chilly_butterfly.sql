DROP TABLE `twitch_user`;--> statement-breakpoint
ALTER TABLE `message` ADD `username` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `message` DROP COLUMN `userId`;