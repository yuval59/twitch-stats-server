CREATE TABLE `channel` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` datetime(6) NOT NULL,
	`updated_at` datetime(6) NOT NULL,
	CONSTRAINT `channel_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` varchar(36) NOT NULL,
	`message` text NOT NULL,
	`badges` json NOT NULL,
	`timestamp` datetime(6) NOT NULL,
	`userId` varchar(36) NOT NULL,
	`channelId` varchar(36) NOT NULL,
	CONSTRAINT `message_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `twitch_user` (
	`id` varchar(36) NOT NULL,
	`username` varchar(255) NOT NULL,
	`badges` json NOT NULL,
	`channelId` varchar(36) NOT NULL,
	`created_at` datetime(6) NOT NULL,
	`updated_at` datetime(6) NOT NULL,
	CONSTRAINT `twitch_user_id` PRIMARY KEY(`id`)
);
