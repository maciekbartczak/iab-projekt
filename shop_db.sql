USE iab;

CREATE TABLE `user` (
  `id` int PRIMARY KEY,
  `username` varchar(255),
  `password` text,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255)
);

CREATE TABLE `user_address` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `address_line1` varchar(255),
  `address_line2` varchar(255),
  `city` varchar(255),
  `postal_code` varchar(255),
  `country` varchar(255),
  `phone_number` varchar(255)
);

CREATE TABLE `product` (
  `id` int PRIMARY KEY,
  `category_id` int,
  `name` varchar(255),
  `description` varchar(255),
  `price` decimal,
  `discount` int
);

CREATE TABLE `product_category` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `description` varchar(255)
);

CREATE TABLE `cart_item` (
  `id` int PRIMARY KEY,
  `cart_id` int,
  `product_id` int,
  `quantity` int
);

CREATE TABLE `shopping_cart` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `total` decimal
);

CREATE TABLE `employee` (
  `id` int PRIMARY KEY,
  `username` varchar(255),
  `password` text,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `role` enum('admin', 'normal')
);

CREATE TABLE `order` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `employee_id` int,
  `payment_id` int,
  `status_id` int,
  `placed_at` timestamp
);

CREATE TABLE `order_item` (
  `id` int PRIMARY KEY,
  `order_id` int,
  `product_id` int,
  `quantity` int
);

CREATE TABLE `payment_details` (
  `id` int PRIMARY KEY,
  `payment_type` enum('transfer'),
  `status` enum('in_progress', 'finished')
);

CREATE TABLE `status_details` (
  `id` int PRIMARY KEY,
  `status` enum('new', 'in_shipping', 'finished')
);

CREATE TABLE `product_categories` (
  `product_id` int,
  `category_id` int
);

ALTER TABLE `user_address` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `shopping_cart` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `cart_item` ADD FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`id`);

ALTER TABLE `cart_item` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`order_id`) REFERENCES `product` (`id`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`payment_id`) REFERENCES `order` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`status_id`) REFERENCES `order` (`id`);

ALTER TABLE `product_categories` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `product_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`);
