USE iab;

INSERT INTO user_role (role) VALUE ('USER');
INSERT INTO user_role (role) VALUE ('EMPLOYEE');
INSERT INTO user_role (role) VALUE ('ADMIN');

INSERT INTO user (role_id, username, password) VALUES (1, 'teryD', 'teryD');
INSERT INTO user (role_id, username, password) VALUES (2, 'adam', 'adam');
INSERT INTO user (role_id, username, password) VALUES (3, 'admin', 'admin');