
$(document).ready(function(){
/makes sure starting buttons are displayed
    var displayedButtons = ["Trevor Noah", "Seth Meyers", "Sarah Silverman", "Aziz Ansari"];
// this function takes the data entered and adds it into the queryURL then starts the ajax 		call and returns the info
    function displayImg(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
		var limit = 10;
		var rating = "PG-13"; //will show pg-13 and below ratings only
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&rating=" + rating + "&api_key=dc6zaTOxFJmzC";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var i = 0; i < limit; i++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
				var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
	}
	
//adds the new button when you enter text and hit submit or enter key
    function addButtons(){ 

		$("#display-buttons").empty();

        for (var i = 0; i < displayedButtons.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

	//changes the state of still to animate of the image when you click on the returned image
    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

	// still working on trying make a button that turns all images active at once right now it takes over and replaces all with first active image.  Need to make a for loop for it to go through the response to do this i think
	function allimageChangeState() {

		var gifstate = $(".gif").attr("data-state");
		var gifanimateImage = $(".gif").attr("data-animate");

		if (gifstate == "still") {

			$(".gif").attr("src",gifanimateImage);
			$(".gif").attr("data-state", "animate");
		}
    
	}

    $("#submitPress").on("click", function(){
		var input = $("#user-input").val().trim();   ///adds new buttons on click
		
		if (input !== "") {
        form.reset();
        displayedButtons.push(input);
        addButtons();

		return false;}

		else if (input == ""){   ///makes sure blank buttons dont get added in
			return false;
		}
		

	})

    addButtons();

    $(document).on("click", "#input", displayImg);
	$(document).on("click", ".gif", imageChangeState); //changes state on click of gif
	$(document).on("click", "#Dance", allimageChangeState);
//trying to change state of all images at once not working yet

});

