
$(document).ready(function(){

	var min;
	var max;
	var number;
	var guessCount;
	var gameOver;

	newGame();

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Run a new game ---*/
  	$(".new").click(function(){
  		newGame();
  	});

  	/*--- Display feedback about guess ---*/
  	$("#guess-form").submit(getFeedBack);

});

/* http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function newGame() {
	gameOver = false;
	min = 1;
	max = 100;
	guessCount = 0;
	number = getRandomInt(min, max);

	$("#feedback").html("Make your Guess!");
	$("#count").html(guessCount);
	$("#guessList").empty();

	console.log("New Game Number: ", number);
}

function stringToNumber(str) {
	return +$.trim(str);
}

function isGuessValid(guess) {
	if(guess.indexOf(".") != -1){
		return false;
	}
	
	guess = stringToNumber(guess);
	
	if(!guess || guess < min || guess > max ) {		
		return false;		
	}	
		
	return true;
}

function getFeedBack(event) {
	event.preventDefault();
	
	if(gameOver) {
		$("#feedback").html("You've already won the game! Press +New Game to play again.");
		return;
	}

	var guess = $("#userGuess").val();	
	if(!isGuessValid(guess)) {		
		$("#feedback").fadeOut("fast");
		$("#feedback").html("You entered &#39;" + guess + "&#39;. <br>" +
			                " Please enter a non-decimal number from " +
			                min + " to " + max + ".");
		$("#feedback").fadeIn("fast");
		return;
	}

	$("#count").html(++guessCount);
	$("#guessList").append("<li>" + guess + "</li>");
	guess = stringToNumber(guess);
	var diff = Math.abs(number - guess);
	
	if(guess === number) {
		$("#feedback").html("Correct! You've won the game!");
		gameOver = true;
	}
	else if(diff <= 5) {
		$("#feedback").html("Your guess is getting too hot!");
	}
	else if(diff <= 10) {
		$("#feedback").html("You guess is getting hot!");
	}
	else if(diff <= 20) {
		$("#feedback").html("You guess is getting warm!");
	}
	else if(diff <= 30) {
		$("#feedback").html("You guess is getting cold!");
	}
	else if(diff <= 40) {
		$("#feedback").html("You guess is getting very cold!");
	}
	else {
		$("#feedback").html("You guess is getting freezing!");
	}

	$("#userGuess").val("");
}
