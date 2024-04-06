CREATE DATABASE sampleApp;
USE sampleApp;

CREATE TABLE users(
	uname VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

INSERT INTO users VALUES ('karthikeyan', '1234567890');

SELECT * FROM users;