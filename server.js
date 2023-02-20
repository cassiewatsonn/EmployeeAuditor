// const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const console = require("console.table");
//todo: link in db folder 
const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
  },
  console.log(`Connected to employees_db database.`)
);

// Do I need this? 
// const PORT = process.env.PORT || 3001;
// const app = express();

// MIDDLEWARE // do i even need this? 
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//todo: create connection to MySQL database ???? 
// const connect = mysql.createConnection({
// // 
// });

// TODO step one: - [ ] WHEN I start the application THEN I am presented with the following options: 
// TODO   view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// app.get('/departments', (req, res) => {
//   // code to view all departments
// });

function firstQuestion(){

  inquirer
    .prompt({
      type: 'list',
      message: 'What would you like to do? ',
      name: 'question',
      choices: [
       'View All Departments',
       'View All Roles', 
       'View All Employees', 
       'Add a Department', 
       'Add a Role', 
       'Add an Employee', 
       'Update an Employee Role'],
    })
  .then(function(response){
    console.log("You selected: "+ response.option)

    // Creating First Question as switch statement to create function for each questions for follow up questions
    switch (response.option) {
      case 'View All Departments':
          viewDept();
          break;
  
      case 'View All Roles':
          viewRoles();
          break;
  
      case 'View All Employees':
          viewEmployees();
          break;
  
      case 'Add a Department':
          addDept();
          break;
  
      case 'Add a Role':
          addRole();
          break;
      
      case 'Add an Employee':
          addEmployee();
          break;
      
      case 'Update an Employee Role':
          updateRole();
          break;
  }
  })

}
//TODO: Use above ^ functions for next questions below 

function viewDept(){
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    res.status(200).json(results);
    firstQuestion();
});
};

function viewRoles(){
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    res.status(200).json(results);
    firstQuestion();
});
}

function viewEmployees(){
  db.query("SELECT employee.id, employee.first_name, employee.last_name, role.role_title, department.department_name AS Department, role.role_salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager  FROM employee  JOIN roles ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;", function (err, results) {
    console.table(results);
    res.status(200).json(results);
    firstQuestion();
});
}

function addDept(){

  inquirer
    .prompt({
      type: 'list',
      message: 'What is the name of the department?',
      name: 'department-name',
      choices: ['Development', 'Finance', 'Sales', 'Service']
    })
    
    .then(function(reply){
      const deptNew = reply;
      db.query("INSERT INTO department ('name') VALUES ?", deptNew, function (err, res) {
        console.log(`${deptNew} has been added to the database.`);
        firstQuestion();
      })
    })


}

function addRole(){
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'role',
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'What department does this role belong to?',
        name: 'department-role',
        choices: ['Development', 'Finance', 'Sales', 'Service']
      },
    ]).then 

}

function addEmployee(){
  
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'firstname',
      },
      {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'lastname',
      },
      {
        type: 'list',
        message: 'What is the employees role?',
        name: 'employee-role',
        choices: ['Sales Person', 'Senior Developer', 'Junior Developer', 'Accountant', 'Service Person']
      },
      {
        type: 'list',
        message: 'Who is the employees manager?',
        name: 'manager',
        choices: ['', '', '', '', '']
      },
    ])
}

function updateRole(){
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee are you updating?",
        name: "employ-update"
      },
    
      {
        type: "input",
        message: "What do you want to update the role to?",
        name: "roleUpdate"
      }
    ])
}

// TODO: Call function to start questions in terminal

firstQuestion();






// app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });