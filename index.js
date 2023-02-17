// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'list',
        message: 'What would you like to do? ',
        name: 'question',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
      },
// When I choose to add a department... 
{
    type: 'list',
    message: 'What is the name of the department?',
    name: 'department-name',
    choices: ['Development', 'Finance', 'Sales', 'Service']
  },

  // When I choose to add a role... 

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


// When I choose to add an employee.... 

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

  // When I choose to update an employee role... 
  
]