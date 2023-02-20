DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL, 
  ON DELETE SET NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    role_title VARCHAR(30) NOT NULL, 
    role_salary DECIMAL NOT NULL, 
    department_id INT AUTO_INCREMENT,  
    FOREIGN KEY (department_id),
    REFERENCES department(id), 
    ON DELETE SET NULL,
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL AUTO_INCREMENT, 
    manager_id INT, 
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id),
    ON DELETE SET NULL,
); 