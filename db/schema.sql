DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL, 
  PRIMARY KEY(id),
  ON DELETE SET NULL
);

CREATE TABLE role (
    id INT NOT NULL, 
    role_title VARCHAR(30) NOT NULL, 
    role_salary INT, 
    department_id INT,  
    PRIMARY KEY(id), 
    FOREIGN KEY (department_id),
    REFERENCES department(id), 
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT, 
    PRIMARY KEY(id),
    ON DELETE SET NULL
); 