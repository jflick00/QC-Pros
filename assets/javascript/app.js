//  Array of Charlotte Hornets
var hornets = ["Kemba Walker", "Dwight Howard", "Jeremy Lamb", "Malik Monk", "Nicolas Batum", "Michael Kidd-Gilchrist", "Cody Zeller", "Frank Kaminsky", "Marvin Williams", "Treveon Graham", "Willy Hernangomez", "Dwayne Bacon", "Michael Carter-Williams", "Marcus Paige"];

function displayGifs() {

    //  Empties out previous list of .gifs to keep count at limit(10)
    $("#gifs-view").empty();
    
    var athlete = $(this).attr("player-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athlete + "&limit=10&api_key=fI0nAwCFo7ivscLpcHLGQj9uwcdx1rJs";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //  Creating a variable to hold the object
        var athleteGiphyArray = response.data;

        //  Creating a for loop
        for(var i=0; i < athleteGiphyArray.length; i++) {
            
            //  Creating a div to hold the image and rating
            var athleteDiv = $("<div class='athlete'>");

            //  Storing the rating data
            var rating = athleteGiphyArray[i].rating;

            //  Creating an element to have the rating displayed
            var rDisplay = $("<p>").text("Rating: " + rating);

            //  Displaying the rating
            athleteDiv.append(rDisplay);
            
            //  Creating an element to hold the image
            var iDisplay = $("<img>");

            //  Adding attributes to the image
            iDisplay.attr("src", athleteGiphyArray[i].images.fixed_width_still.url);
            iDisplay.attr("still", athleteGiphyArray[i].images.fixed_width_still.url);
            iDisplay.attr("animated", athleteGiphyArray[i].images.fixed_width.url);

            //  Adding class to the still image
            iDisplay.addClass("giphyImage");

            //  Appending the image
            athleteDiv.append(iDisplay);

            //  Dumping image and rating into the page
            $("#gifs-view").append(athleteDiv);

            //  When image is clicked...
            iDisplay.on("click", function() {
               
                //  If src attribute is equal to still attribute...
                if ($(this).attr("src") === $(this).attr("still")) {
                    //  then change the src attribute to animated
                    $(this).attr("src", $(this).attr("animated"));
                }
                else {
                    //  Otherwise revert back to still
                    $(this).attr("src", $(this).attr("still"));
                }
            });
            
        }
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
        button.attr("player-name", hornets[i]);
        
        // Providing the initial button text
        button.text(hornets[i]);
        
        // Adding the button to the buttons-view div
        $("#buttons-view").append(button);
    }
}

$("#add-athlete").on("click", function(event) {
    
    //  This line prevents from submitting a form on click
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