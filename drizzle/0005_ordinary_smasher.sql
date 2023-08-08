ALTER TABLE `message` MODIFY COLUMN `username` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `role` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `username` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `roleId` varchar(36) NOT NULL;