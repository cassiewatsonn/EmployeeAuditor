// const express = require('express');
const { response } = require("express");
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");

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

// db.connect(function(err){
//   if (err) throw err
//   firstQuestion();
// });


// WHEN I start the application THEN I am presented with the following options: 
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

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
    // console.log("You selected: "+ response.question)

    // Creating First Question as switch statement to create function for each questions for follow up questions
    switch (response.question) {
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
};
// Using above ^ functions for next question functions below 

function viewDept(){
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    firstQuestion();
})
};

function viewRoles(){
  db.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.id = department.id", function (err, results) {
    console.table(results);
    firstQuestion();
})
};

function viewEmployees(){
  db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager  FROM employee  JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;", function (err, results) {
    if(err) console.log(err);
    console.table(results);
    firstQuestion();
})
};

function addDept(){

  inquirer
    .prompt({
      type: 'input',
      message: 'What is the name of the department?',
      name: 'department'
    })
    .then(function(reply){
      const deptNew = reply.department;
      db.query("INSERT INTO department (name) VALUES (?)", deptNew, function (err, res) {
        console.log(`${deptNew} has been added to the database.`);
        firstQuestion();
      })
    })
  };

function addRole(){
  db.query('SELECT * FROM department', function (err, res){
    const departmentOptions = res.map(role => {
      return (
        {
          name: role.name,
          value: role.id
        }
      )
    })
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the name of the role?',
          name: 'title',
        },
        {
          type: 'input',
          message: 'What is the salary of the role?',
          name: 'salary',
        },
        {
          type: 'list',
          message: 'What department does this role belong to?',
          name: 'department_id',
          choices: departmentOptions
        },
      ]).then(function(reply){
        const role = {
          title:reply.title, 
          salary: reply.salary, 
          department_id: reply.department_id
        }
        db.query("INSERT INTO role SET ?", role, function (err, res) {
          console.log(`${reply.title} has been added to the database.`);
          firstQuestion();
        });
      })
    })
  };

function addEmployee(){
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'first_name',
      },
      {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'last_name',
      },
      {
        type: 'list',
        message: 'What is the employees role?',
        name: 'role_id',
        choices: [{name:'Sales Lead', value:1}, {name:'Salesperson', value: 2}, {name:'Lead Engineer', value: 3}, {name:'Software Engineer', value: 4}, {name:'Account Manager', value:5}, {name:'Accountant', value: 6}, {name:'Legal Team Lead', value:7}, {name:'Lawyer', value:8}]
      },
      {
        type: 'list',
        message: 'Who is the employees manager?',
        name: 'manager_id',
        choices: [{name:'John Doe', value: 1}, {name:'Ashley Rodriguez', value: 3}, {name:'Kunal Singh', value: 5}, {name:'Sarah Lourd', value: 7}]
      },
    ]).then(function(reply){
      const newEmployee = {
        first_name: reply.first_name, 
        last_name: reply.last_name,
        role_id: reply.role_id, 
        manager_id: reply.manager_id,  
      }
    db.query('INSERT INTO employee SET ?', newEmployee,  function (err, res){
      console.log(`${reply.first_name} has been added to the database.`);
      firstQuestion();
    })
  })
};

function updateRole(){
 db.query('SELECT * FROM employee', function(err, res) {
  // console.log(res);
  const employUpdate = res.map(employee => {
    return (employee.first_name + ' ' + employee.last_name);
      // {
      //   first_name:employee.first_name, 
      //   last_name:employee.last_name, 
      // })
  })
 
  db.query('SELECT * FROM role', function(err, res){
    // console.log(res);
    const roleUpdate = res.map(role => {
      return (
        {
          name: role.name,
          value: role.title,
        }
      )
    })
 
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee are you updating?",
        name: "employee", 
        choices: employUpdate
      },
      {
        type: "list",
        message: "What do you want to update the role to?",
        name: 'role',
        choices: roleUpdate
      }
    ])
    .then((response) => {
      let { employUpdate, roleUpdate } = response
      db.query("UPDATE employee SET role_id = ? WHERE first_name = ?",  [employUpdate, roleUpdate], function (err, res) {
          if (err) {
              console.log(err)
              process.exit(1);
          }
          console.log('Employee updated!')
          firstQuestion();
      })
    })
  })
})
};

// Call function to start questions in terminal

firstQuestion();


