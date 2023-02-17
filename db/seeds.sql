INSERT INTO department (department_name)
VALUES ("Development"),
       ("Finance"),
       ("Service"),
       ("Sales");

INSERT INTO role (role_title, role_salary, department_id)
VALUES ("Junior Developer", 50000, 001);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (Jakob, Wilson, 1, 1), 
       (Bob, Peterson, 2), 
