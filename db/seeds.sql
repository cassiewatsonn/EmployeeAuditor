-- INSERT INTO department (name)
-- VALUES ("Development"),
--        ("Finance"),
--        ("Service"),
--        ("Sales");

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Junior Developer", 50000, 1), 
--        ("Sales Person", 70000, 2), 
--        ('Senior Developer', 80000, 3), 
--        ('Accountant', 65000, 4), 
--        ('Service Person', 60000, 4);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ('Jakob', 'Wilson', 1, 2), 
--        ('Bob', 'Peterson', 1, 3), 
--        ('Sally', 'Doe', 3, 4), 
--        ('Jimmy', 'Hill', 4, NULL), 
--        ('Paula', 'Gibson', 5, NULL)

use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
