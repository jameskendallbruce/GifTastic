$( document ).ready(function() {

    var movies = ["In the Mood for Love", "Moonlight", "The House of the Devil", "Scott Pilgrim v. the World", "Breathless"];

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

    $(".movie-btn").on("click", function() {
      
        //filling the new var person with the value of the button's attribute 'data-person'... but you could call it anything 
        var searchTerm = $(this).attr("data-name");
  
        // variable that is a giphy api search with the person variable inserted into it.
        // This includes a limit of returned results to 10.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        // simple ajax method like always
        $.ajax({
          url: queryURL,
          method: "GET"

        // closes and calls the promise above before calling a new function
        }).then(function(response) {
  
            // new variable made up of the api object's data sub-array (full of objects)
            var results = response.data;
  
            // simple for loop intro using the length of the result variable as a parameter
            for (var i = 0; i < results.length; i++) {
  
              // new variable to make a div with class of item (the class seems to be left from an earlier version of the demo)
              var gifDiv = $("<div>");
  
              // var rating is set to the return of each index's rating key.
              var rating = results[i].rating;
  
              // create a new variable for a new paragraph to display the rating.
              var p = $("<p>").text("Rating: " + rating);
  
              // new variable to hold each giphy image returned
              var personImage = $("<img>");
  
              // and we add the version of the image with a fixed height (so they're uniform)
              // we really need to know this specific api to know what to call
              personImage.attr("src", results[i].images.fixed_height.url);
  
              // prepends the rating and image itself to the gifDiv variable that we created.
              gifDiv.prepend(p);
              gifDiv.append(personImage);
  
              // prepending that whole div (gifDiv) to the existing DOM div "#gifs-appear-here"
              $("#gif-town").prepend(gifDiv);

            }

        });

    });



});