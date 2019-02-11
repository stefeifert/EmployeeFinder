const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.port || 3000;


app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, './app/public/home.html'));
});

app.get('/survey', function (request, response) {
  response.sendFile(path.join(__dirname, './app/public/survey.html'));
});



app.get('/api/employees', function (req, res) {
  return res.json(employees);
});

// app.get('/api/employees/:employee', function (req, res) {
//   const chosen = req.params.employee;
//   console.log(chosen);
//   for (let i = 0; i < employees.length; i++) {
//     if (chosen === employees[i].routeName) {
//       return res.json(employees[i]);
//     }
//   }

//   return res.send('No employee found');
// });

//WHERE DOES THIS GO??//
app.listen(PORT, function () {
  console.log(`Server is listening on: ${PORT}`);
});





