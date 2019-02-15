var allFieldsCompleted;
      $(document).ready(function() {
        // Event Listener for Submission
        $('#submitButton').on('click', function() {
          
          // Check if all the user fields are completed
          checkIfComplete(function(){
            // Proceed with AJAX call if all questions are answered
            if(allFieldsCompleted){
              collectInputs();
            }
            else{
              alert('Please complete all fields before submitting!');
            }
          }); // end checkIfComplete() callback
        }); // end submit listener
      }); // document ready
      // Function to valid user input
      function checkIfComplete(callback){
        // Check through all the questions (i.e. iterate through all of class "chosen-select")
        var questionsCompleted;
        $('.chosen-select').each(function(){
          if ( $(this).val() == "" ){
            questionsCompleted = false;
          }
        })
        // This counters the async behavior of $.each()
        .promise().done(function(){
          // Check if any questions are incomplete
          if(questionsCompleted == false){
            allFieldsCompleted = false;
          }
          // Determine if Name is entered
          else if( $('#formName').val().trim() == "" ){
            allFieldsCompleted = false;
          }
          // Determine if Link is entered
          else if( $('#formImage').val().trim() == "" ){
            allFieldsCompleted = false;
          }
          // Otherwise, the all fields are completed
          else{
            allFieldsCompleted = true;
          }
          // Fire Off Callback (to counter async behavior of $.each)
          callback();       
        });
      }
      function collectInputs(){
        // Make new employee object
        var newEmp = {
          name: $('#formName').val().trim(),
          photo: $('#formImage').val().trim(),
          scores: []
        };
        // Loop through Questions to get scores
        var scoresArray = [];
        $('.chosen-select').each(function(){
          scoresArray.push( parseInt( $(this).val() ) ); // Parse Input Value as integer
        })
         // This counters the async behavior of $.each()
        .promise().done(function(){
          
          // Push the array of scores to the new employee object
          newEmp.scores = scoresArray;
          // POST the newEmp to the employees.js file and get back the best match
          var currentURL = window.location.origin;
          $.post(currentURL + "/api/employees", newEmp, function(data){
            // Add Best Match attributes to Modal
            $('#matchName').text(data.name);
            $('#matchImg').attr('src', data.photo);
            // Show the modal with the best match 
            $("#resultsModal").modal('toggle');
          }); // end AJAX POST
        });
      }