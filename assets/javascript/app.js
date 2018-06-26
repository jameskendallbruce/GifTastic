// always start with a ready function
$( document ).ready(function() {

    // this is an alternate movie array. Moving the focus to animation.
    var movies = [
        "The Tatami Galaxy",
        "Samurai Jack",
        "Paprika",
        "The Tale of Princess Kaguya",
        "Kimi no Na wa",
        "Coraline",
        "The Iron Giant",
        "Song of the Sea",
        "The Thief and the Cobbler",
        "Sleeping Beauty",
        "Paperman",
        "Glen Keane",
        "Don Hertzfeldt"
    ];

    // variable to check if a new entry already exists in the array.
    var status = true;

    // turned on once gifs are ready
    clickReady = false;

    renderButtons();

    // checks if an entry is already in an array. Couldn't quite get it to working 100% consistently so I'm leaving it out for now.
    // function checkStatus(value,arr){
       
    //     for(var i=0; i<arr.length; i++){

    //         var name = arr[i];
         
    //         if(name == value){
          
    //             status = false;
         
    //         }
         
    //         else{
            
    //             status = true;
         
    //         }

    //     }
        
    // }

    // This function handles events where a movie is added by the user 
    $("#add-button").on("click", function(event) {

        event.preventDefault();

        var inputSlot = $("#user-entry");

        // variable to save the user's film name in
        var input = inputSlot.val();

        console.log("input is: " + input);

        // checking if input exists in the movies array.
        checkStatus(input, movies);

        console.log("Checking status: " + status)

        // making sure that the input isn't blank.
        if(input != 0) {

            // checking if the entry passed the checkStatus function.
            // Note Status is permanently set in true in the current version.
            if(status == true) {

                // Adding newMovie from the textbox to our array
                movies.push(input);

                // Calling renderButtons which handles the processing of our movie array

                console.log("are all buttons ready? " + clickReady)

            }

        }

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        console.log(movies)

        inputSlot.val("");
      
    });

    // Function for displaying movie gifs
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-town").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newButton = $("<button>");
          
          // Adding a class of movie-btn and some basic bootstrap to our buttons
          newButton.addClass("btn btn-outline-light my-1 mx-1 movieButton");
          
          // Adding a data-attribute
          newButton.attr("data-name", movies[i]);
          
          // Providing the initial button text
          newButton.text(movies[i]);
          
          // Adding the button to the buttons-view div
          $("#button-town").append(newButton);
        
        }

        clickReady = true;
      
    }

    $(document).on("click", ".movieButton", function() {

        console.log("is button ready? " + clickReady)
      
        // an if loop for some troubleshooting
        if(clickReady === true) {

            $("#gif-town").show();

            $("#gif-town").empty();

            //filling the new var person with the value of the button's attribute 'data-person'... but you could call it anything 
            var searchTerm = $(this).attr("data-name");
  
            // variable that is a giphy api search with the person variable inserted into it.
            // This includes a limit of returned results to 10.
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=z7LzL8NuBkyn0IOdY2oxan0962WvtV6Y&limit=10";
  
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
  
                    // new variable to make a div with some classes for bootstrap/css.
                    var gifDiv = $("<div>");

                    // classes for bootstrap/css
                    gifDiv.attr("class", "gifDiv btn btn-light rounded p-2 m-3");
  
                    // var rating is set to the return of each index's rating key.
                    var rating = results[i].rating;

                    // this will make up the rest of the gifDiv that isn't the image.
                    var cardBody = $("<div>");

                    // more classes for bootstrap/css
                    cardBody.attr("class", "bg-info");

                    //adding within cardBody some html for the title, rating and a link to the gif from giphy.com
                    //Originally the plan was to add a download button but unfortunately neither the download method nor the <a href download> method seem to work with api. They all redirect to giphy.com
                    cardBody.html("<div class='card-text px-1 text-white'><p class='title-slot'>" + searchTerm + "</p> <p>Rating: " + rating + "</p>" + "<a class='btn download-button text-info mb-2 bg-light rounded' href='" + results[i].images.fixed_height.url + "'>Gif Link</a></div>");
  
                    // new variable to hold each giphy image returned
                    var clickImage = $("<img>");
  
                    // and we add the version of the image with a fixed height (so they're uniform)
                    // we really need to know this specific api to know what to call
                    clickImage.attr("src", results[i].images.fixed_height_still.url);

                    // adding a class and some data attributes for functionality

                    clickImage.attr("class", "clickGif");

                    clickImage.attr("data-still", results[i].images.fixed_height_still.url);
  
                    clickImage.attr("data-animate", results[i].images.fixed_height.url);

                    clickImage.attr("data-state", "still");
  
                    // prepends the rating and image itself to the gifDiv variable that we created.
                    gifDiv.append(clickImage);
                    gifDiv.append(cardBody);
  
                    // prepending that whole div (gifDiv) to the existing DOM div "#gifs-appear-here"
                    $("#gif-town").prepend(gifDiv);

                }

            });

        };

    });

    // adds a click event to each clickGif
    $(document).on("click", ".clickGif", function() {

        var state = $(this).attr("data-state");
  
        console.log(state);
  
        // checks the state (whether still or animated)
        if (state === "still") {
  
        // then update the src attribute of this image to it's data-animate value,
  
        $(this).attr("src", $(this).attr("data-animate"));
  
        // and update the data-state attribute to 'animate'.
  
        $(this).attr("data-state", "animate");
  
        }
    
        else{
  
        // If state is equal to 'animate', then update the src attribute of this
  
        // image to it's data-still value and update the data-state attribute to 'still'
  
        $(this).attr("src", $(this).attr("data-still"));
  
        $(this).attr("data-state", "still");
  
        };

    });





// end ready fucntion
});