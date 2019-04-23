$(document).ready(function () {

    var topics = ["titanic", "white chicks", "shrek", "the matrix", "the godfather", "the avengers", "forrest gump", "bohemian rhapsody"];
    var newMovie = "";
 
   

    function makeButtons() {
        $(".one").empty();

        for (var x = 0; x < topics.length; x++) {
            var newButton = $("<button>");
            newButton.attr("class", "btn");
            newButton.text(topics[x])
            newButton.attr("data-movie", topics[x])

    
            $(".one").append(newButton)
    
        }
        newGif();
    }
    $(".submit").on("click", function (event) {
        event.preventDefault();
        newMovie = $("#new-movie").val().trim()
        topics.push(newMovie)
        $("#new-movie").val("");
        makeButtons();

    })

    makeButtons();
   
    function newGif() {
    $(".btn").on("click", function () {
        
        var movie = $(this).attr("data-movie");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie +"&limit=10&api_key=50H4VOGtWkmfMohTYyqpo5LDlJEnj4B5";
   

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            $(".movieDiv").empty();
            console.log(response);
            var results = response.data
            console.log(results)
           
            for (var i = 0; i < results.length; i++) {
               
                var movieDiv = $("<div>");
                movieDiv.attr("class", "movieDiv");
                
                var ratingP = $("<p>");
                ratingP.text("Rating: " + results[i].rating)

                var movieGif = $("<img>");
                movieGif.attr("class", "gif")
           
                movieGif.attr("still-data", results[i].images.fixed_height_still.url)
                movieGif.attr("animated-data", results[i].images.fixed_height.url)
                movieGif.attr("src", results[i].images.fixed_height_still.url)
                movieGif.attr("status", "still")

                movieDiv.append(ratingP);
                movieDiv.append(movieGif);
               
                $(".movie-col").append(movieDiv);


            }

     $(".gif").on("click", function () {
        var status = $(this).attr("status")
     

        if (status === "still") {
            $(this).attr("src", $(this).attr("animated-data"));
            $(this).attr("status", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("still-data"));
            $(this).attr("status", "still");

        }
        })


    });

    })
}
});