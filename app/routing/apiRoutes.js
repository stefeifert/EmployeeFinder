console.log('API Route Connected Successfully');


// Link in Employees Data
var employeesData = require('../data/employees.js');


// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/employees. This will be used to display a JSON of all possible employees.
  app.get('/api/employees', function (req, res) {
    res.json(employeesData);
  });

  // A POST routes /api/employees. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/employees', function (req, res) {

    // Parse new employee input to get integers (AJAX post seemed to make the numbers strings)
    var newEmployee = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newEmployee.scores = scoresArray;


    // Cross check the new employee entry with the existing ones
    var scoreComparisionArray = [];
    for(var i=0; i < employeesData.length; i++){

      // Check each employee's scores and sum difference in points
      var currentComparison = 0;
      for(var j=0; j < newEmployee.scores.length; j++){
        currentComparison += Math.abs( newEmployee.scores[j] - employeesData[i].scores[j] );
      }

      // Push each comparison between employees to array
      scoreComparisionArray.push(currentComparison);
    }

    // Determine the best match using the postion of best match in the friendsData array
    var bestMatchPosition = 0; // assume its the first person to start
    for(var i=1; i < scoreComparisionArray.length; i++){
      
      // Lower number in comparison difference means better match
      if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    // ***NOTE*** If the 2 employees have the same comparison, then the NEWEST entry in the friendsData array is chosen
    var bestEmployeeMatch = employeesData[bestMatchPosition];



    // Reply with a JSON object of the best match
    res.json(bestEmployeeMatch);



    // Push the new employee to the employees data array for storage
    employeesData.push(newEmployee);

  });

}


// Export for use in main server.js file
module.exports = apiRoutes;