CREATE TABLE `cart` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`product_id` integer,
	`quantity` integer,
	`price` real,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`category_id` text PRIMARY KEY NOT NULL,
	`name` text,
	`desc` text
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY NOT NULL,
	`buyer_id` integer,
	`order_date` integer,
	`shipaddr1` text,
	`shipaddr2` text,
	`total_cost` real,
	FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`product_id` integer PRIMARY KEY NOT NULL,
	`category_id` text,
	`title` text,
	`desc` text,
	`price` real,
	`rating` real,
	`likes` integer,
	`onSale` integer,
	`image` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text,
	`name` text,
	`addr1` text,
	`addr2` text
);
