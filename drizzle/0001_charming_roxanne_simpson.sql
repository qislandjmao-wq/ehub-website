CREATE TABLE `boss_kills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`killedAt` timestamp NOT NULL,
	`bossName` varchar(128) NOT NULL,
	`season` varchar(64) NOT NULL DEFAULT '飞升者行动',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `boss_kills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kill_participants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`killId` int NOT NULL,
	`playerName` varchar(64) NOT NULL,
	CONSTRAINT `kill_participants_id` PRIMARY KEY(`id`)
);
