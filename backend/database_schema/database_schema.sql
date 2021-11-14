USE iab;

CREATE TABLE IF NOT EXISTS `User` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `roleId` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL
);

CREATE TABLE IF NOT EXISTS `UserAddress` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `UserId` int NOT NULL,
  `addressLine1` varchar(255) NOT NULL,
  `addressLine2` varchar(255),
  `city` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `UserRole` (
    `id` int AUTO_INCREMENT PRIMARY KEY,
    `role` enum('USER', 'EMPLOYEE', 'ADMIN') NOT NULL
);

CREATE TABLE IF NOT EXISTS `Product` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal NOT NULL,
  `imageUrl` varchar(255)
);

CREATE TABLE IF NOT EXISTS `Category` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `CartItem` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `cartId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `ShoppingCart` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `UserId` int NOT NULL,
  `total` decimal NOT NULL
);

CREATE TABLE IF NOT EXISTS `Order` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `UserId` int NOT NULL,
  `paymentId` int NOT NULL,
  `statusId` int NOT NULL,
  `placedAt` timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS `OrderItem` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `PaymentDetails` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `paymentType` enum('transfer') NOT NULL,
  `status` enum('in_progress', 'finished') NOT NULL
);

CREATE TABLE IF NOT EXISTS `StatusDetails` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `status` enum('new', 'in_shipping', 'finished') NOT NULL
);

CREATE TABLE IF NOT EXISTS `ProductCategories` (
  `productId` int NOT NULL,
  `categoryId` int NOT NULL
);

ALTER TABLE `UserAddress` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`id`);

ALTER TABLE `ShoppingCart` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`id`);

ALTER TABLE `CartItem` ADD FOREIGN KEY (`cartId`) REFERENCES `ShoppingCart` (`id`);

ALTER TABLE `CartItem` ADD FOREIGN KEY (`productId`) REFERENCES `Product` (`id`);

ALTER TABLE `Order` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`id`);

ALTER TABLE `Order` ADD FOREIGN KEY (`paymentId`) REFERENCES `PaymentDetails` (`id`);

ALTER TABLE `Order` ADD FOREIGN KEY (`statusId`) REFERENCES `StatusDetails` (`id`);

ALTER TABLE `OrderItem` ADD FOREIGN KEY (`productId`) REFERENCES `Product` (`id`);

ALTER TABLE `OrderItem` ADD FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`);

ALTER TABLE `ProductCategories` ADD FOREIGN KEY (`productId`) REFERENCES `Product` (`id`);

ALTER TABLE `ProductCategories` ADD FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`);

ALTER TABLE `User` ADD FOREIGN KEY (`roleId`) REFERENCES `UserRole` (`id`);

CREATE UNIQUE INDEX user_username_uindex ON User (username);

INSERT INTO UserRole (role) VALUE ('USER');
INSERT INTO UserRole (role) VALUE ('EMPLOYEE');
INSERT INTO UserRole (role) VALUE ('ADMIN');

INSERT INTO User (roleId, username, password, firstName, lastName, email)
VALUES (1, 'teryD', '$2y$10$WBkYKnXORMVXb5NbYN/A1uFbAqPdwJEv5LIjhtpo3VrJiRd3zPfge', 'Terry', 'Derek', 'terryderek@mail.com');
INSERT INTO User (roleId, username, password, firstName, lastName, email)
VALUES (2, 'adam', '$2y$10$PCKDQbsLPumY9Ri0SShrxuLD09cT0T4D6OiaPSTFgjS6VFTiQ488C', 'Adam', 'Sanchez', 'asanchez@mail.com');
INSERT INTO User (roleId, username, password, firstName, lastName, email)
VALUES (3, 'admin', '$2y$10$ZS4jxTbECMfE.9Cz9QLLiO9ANM87enbtpKRvLiGa6RWx6DxwdAzI6', 'Rick', 'Sanchez', 'rick@sanchez.com');