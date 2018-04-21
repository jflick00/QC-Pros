//  Array of Charlotte Hornets
var hornets = ["Kemba Walker", "Dwight Howard", "Jeremy Lamb", "Malik Monk", "Nicolas Batum", "Michael Kidd-Gilchrist", "Cody Zeller", "Frank Kaminsky", "Marvin Williams", "Treveon Graham", "Guillermo Hernangomez", "Dwayne Bacon", "Michael Carter-Williams", "Julyan Stone", "Marcus Paige"];

// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    $("#gifs-view").empty();
    
    var athlete = $(this).attr("player-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athlete + "&limit=10&api_key=fI0nAwCFo7ivscLpcHLGQj9uwcdx1rJs";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    console.log(response);

        //  Creating a variable to hold the object
        var athleteGiphyArray = response.data;

        //  Creating a for loop to display the number(10) of .gifs displayed
        for(var i=0; i < athleteGiphyArray.length; i++) {
            
            //  Creating a div to hold the image and rating
            var athleteDiv = $("<div class='athlete'>");

            //  Storing the rating data
            var rating = athleteGiphyArray[i].rating;

            //  Creating an element to have the rating displayed
            var rDisplay = $("<p>").text("Rating: " + rating);

            //  Displaying the rating
            athleteDiv.append(rDisplay);
            
            //  Storing the .gif image
            var giphyImage = athleteGiphyArray[i].images.fixed_width_still.url;
            
            //  Creating an element to hold the image
            var iDisplay = $("<img>").attr("src", giphyImage);

            //  Appending the image
            athleteDiv.append(iDisplay);

            //  Dumping everything into the page
            $("#gifs-view").append(athleteDiv);
            
        }
        console.log(rating);
        console.log(giphyImage);

    });
}    

function renderButtons() {

    //  Prevents having repeat buttons
    $("#buttons-view").empty();

    // Looping through the array of Hornets players
    for (var i = 0; i < hornets.length; i++) {

        //  Creating a button for each player in the array
        var button = $("<button>");
        
        // Adding a class of athlete-btn to our button
        button.addClass("athlete-btn btn-primary");
        
        // Adding a data-attribute
        button.attr("player-name", hornets);
        
        // Providing the initial button text
        button.text(hornets[i]);
        
        // Adding the button to the buttons-view div
        $("#buttons-view").append(button);
    }
}

$("#add-athlete").on("click", function(event) {
    
    event.preventDefault();
    
    // This line grabs the input from the textbox
    var athlete = $("#athlete-input").val().trim();

    // Adding athlete from the textbox to our array
    hornets.push(athlete);

    // Calling renderButtons which handles the processing of our athlete array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "athlete-btn"
  $(document).on("click", ".athlete-btn", displayGifs);
      

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  