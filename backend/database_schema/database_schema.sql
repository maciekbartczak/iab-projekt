USE iab;

CREATE TABLE `user` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `role_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL
);

CREATE TABLE `user_address` (
  `id` int PRIMARY KEY,
  `user_id` int NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255),
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL
);

CREATE TABLE `user_role` (
    `id` int AUTO_INCREMENT PRIMARY KEY,
    `role` enum('USER', 'EMPLOYEE', 'ADMIN') NOT NULL
);

CREATE TABLE `product` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal NOT NULL
);

CREATE TABLE `category` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
);

CREATE TABLE `cart_item` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL
);

CREATE TABLE `shopping_cart` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `total` decimal NOT NULL
);

CREATE TABLE `order` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `payment_id` int NOT NULL,
  `status_id` int NOT NULL,
  `placed_at` timestamp NOT NULL
);

CREATE TABLE `order_item` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL
);

CREATE TABLE `payment_details` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `payment_type` enum('transfer') NOT NULL,
  `status` enum('in_progress', 'finished') NOT NULL
);

CREATE TABLE `status_details` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `status` enum('new', 'in_shipping', 'finished') NOT NULL
);

CREATE TABLE `product_categories` (
  `product_id` int NOT NULL,
  `category_id` int NOT NULL
);

ALTER TABLE `user_address` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `shopping_cart` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `cart_item` ADD FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`id`);

ALTER TABLE `cart_item` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`payment_id`) REFERENCES `payment_details` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`status_id`) REFERENCES `status_details` (`id`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `product_categories` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `product_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`);

CREATE UNIQUE INDEX user_username_uindex ON user (username);