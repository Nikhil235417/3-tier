CREATE DATABASE IF NOT EXISTS devopsdb;
USE devopsdb;

CREATE TABLE demo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255)
);

INSERT INTO demo (message) VALUES ("Hello from MySQL Database!");
