INSERT INTO department (id, department_name)
VALUES (001, "IT"),
       (002, "Human Resources"),
       (003, "Payroll");

INSERT INTO role (id, role_title, role_salary, department_id)
VALUES (1, "Junior Developer", 50, 001);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, Jakob, Anderson, 1, 1), 
       (1, Cassie, Watson, 2), 
