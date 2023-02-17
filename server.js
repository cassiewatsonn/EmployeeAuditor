const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const console = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARE 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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



app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });