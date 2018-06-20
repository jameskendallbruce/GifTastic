$( document ).ready(function() {

    var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

    var status = true;

    renderButtons();

    // checks if an entry is already in an array
    function checkStatus(value,arr){
       
        for(var i=0; i<arr.length; i++){

            var name = arr[i];
         
            if(name == value){
          
                status = false;
          
                break;
         
            }
         
            else{
            
                status = true;
         
            }

        }
        
    }

    // This function handles events where a movie button is clicked
    $("#add-button").on("click", function(event) {

        input = $("#user-button").val();

        checkStatus(input, movies);

        if(input != 0) {

            if(status == true) {

                event.preventDefault();
    
                // This line grabs the input from the textbox    
                var newMovie = $("#user-button").val().trim();

                // Adding movie from the textbox to our array
                movies.push(newMovie);

                // Calling renderButtons which handles the processing of our movie array
                renderButtons();

            }

        }

      
    });

    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-town").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newButton = $("<button>");
          
          // Adding a class of movie-btn to our button
          newButton.addClass("movie-btn btn btn-outline-secondary mx-1");
          
          // Adding a data-attribute
          newButton.attr("data-name", movies[i]);
          
          // Providing the initial button text
          newButton.text(movies[i]);
          
          // Adding the button to the buttons-view div
          $("#button-town").append(newButton);
        
        }
      
    }



});