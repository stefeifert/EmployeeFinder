const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'public/home.html'));
  });
  
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'public/survey.html'));
  });
  
//WHERE DOES THIS GO??//
  app.listen(PORT, function() {
    console.log(`Server is listening on: http://localhost:${PORT}`);
  });
  //*

app.get('/api/employees', function(req, res) {
    return res.json(employees);
  });

app.get('/api/employees/:employee', function(req, res) {
    const chosen = req.params.employee;
    console.log(chosen);
    for (let i = 0; i < employees.length; i++) {
      if (chosen === employees[i].routeName) {
        return res.json(employees[i]);
      }
    }
  
    return res.send('No employee found');
  });
  


  
  