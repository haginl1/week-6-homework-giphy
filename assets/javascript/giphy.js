$( document ).ready(function() {   
	var heroButtons = ["WonderWoman", "Batman", "Superman"];
	var newHero = "";
	//creates a div for the buttons in the current array and a place for newly created buttons and appends them to the DOM 
	renderButtons();
	function renderButtons(){
		for(var i = 0; i < heroButtons.length; i++) {
				var newButton = $("<button>");
				newButton.text(heroButtons[i]);
				newButton.addClass("myButton");
				newButton.attr("value", heroButtons[i]);
				$("#heroButtons").append(newButton);
				}
	}
	//checks to see if there is anything in the search hero form and alerts if empty
	$("#addHero").on('click', function(event){
		event.preventDefault(); 
		newHero = $("#heroInput").val().trim();
		if (newHero === ""){
			alert("Yo G, please type a hero you want to search for");
		}
		else{
	//takes the input from the form and adds the hero button to the page with the defines attributes
		heroButtons.push(newHero);
		// $("#heroInput").val( " ");
		$("#heroButtons").empty();
			for(var i = 0; i < heroButtons.length; i++) {
			var newButton = $("<button>");
			newButton.text(heroButtons[i]);
			newButton.addClass("myButton");
			newButton.attr("value", heroButtons[i]);
			$("#heroButtons").append(newButton);
			}
		}
	})

//when the hero button is clicked call the set number of images from the api site defined by the limit and cycle through each and add attributes to the img including the rating
	$("#heroButtons").on('click',".myButton", function(){
		$("#heros").empty();
		var newHeroSearch = $(this).val().trim(); 
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newHeroSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
		//make the call and get the object response for the i images
		$.ajax({
		url: queryURL, 
		method: 'GET'})
		.done(function(response) {
		//when you get the response for the images create the attributes on i images 
			for (var i = 0; i < response.data.length; i++) {
				var heroGifAnimated = response.data[i].images.fixed_height.url;
				var heroGifStill = response.data[i].images.downsized_still.url;
				var imageRating = response.data[i].rating;
				//create a place to send to the DOM
				var herosDIV= $("<div id='imageRatingContainer' >");
				var image = $("<img>").attr({
					"src": heroGifStill,
					"data-still": heroGifStill,
					"data-animate": heroGifAnimated,
					"data-state": "still",
					"class": "gif",
					"alt": "rating: " + imageRating
				});
				var ratingDIV = $("<p id='imgRating'>");
				ratingDIV.text (image.attr("alt"));
				herosDIV.append(image);
				herosDIV.append(ratingDIV); 
				$("#heros").append(herosDIV);
			}
				//then once the images are on the page target the gif class that was added above and call the still or animate url when clicked
			$(".gif").on("click", function() {
			var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				} 
				else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			})
		});
	});

});//end document.ready