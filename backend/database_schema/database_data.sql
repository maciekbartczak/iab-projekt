USE iab;

INSERT INTO user_role (role) VALUE ('USER');
INSERT INTO user_role (role) VALUE ('EMPLOYEE');
INSERT INTO user_role (role) VALUE ('ADMIN');

INSERT INTO user (role_id, username, password, first_name, last_name, email)
VALUES (1, 'teryD', '$2y$10$WBkYKnXORMVXb5NbYN/A1uFbAqPdwJEv5LIjhtpo3VrJiRd3zPfge', 'Terry', 'Derek', 'terryderek@mail.com');
INSERT INTO user (role_id, username, password, first_name, last_name, email)
VALUES (2, 'adam', '$2y$10$PCKDQbsLPumY9Ri0SShrxuLD09cT0T4D6OiaPSTFgjS6VFTiQ488C', 'Adam', 'Sanchez', 'asanchez@mail.com');
INSERT INTO user (role_id, username, password, first_name, last_name, email)
VALUES (3, 'admin', '$2y$10$ZS4jxTbECMfE.9Cz9QLLiO9ANM87enbtpKRvLiGa6RWx6DxwdAzI6', 'Rick', 'Sanchez', 'rick@sanchez.com');