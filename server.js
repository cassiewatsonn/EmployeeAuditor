const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARE 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// TODO step one: - [ ] WHEN I start the application THEN I am presented with the following options: 
// TODO   view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
app.get('/departments', (req, res) => {
  // code to view all departments
});



app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });