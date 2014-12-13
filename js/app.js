
$(document).ready(function(){

	var min;
	var max;
	var number;
	var guessCount;

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

  	/*--- Display guess feedback ---*/
  	//$("#guess-form").submit({min: min, max: max}, getFeedBack);
  	$("#guess-form").submit(getFeedBack);

});

/* http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function newGame() {
	$("#feedback").html("Make your Guess!");
	$("#guessList").html("");
	guessCount = 0;
	$("#count").html(guessCount);

	min = 1;
	max = 100;
	number = getRandomInt(min, max);

	console.log("New Game Number: ", number);
}

function isGuessValid(guess) {
	if(guess.indexOf(".") != -1){
		return false;
	}
	
	guess = +$.trim(guess);
	
	if(!guess || guess < min || guess > max ) {		
		return false;		
	}	
		
	return true;
}

function updateGuessCount(count) {
	guessCount = count;
	$("#count").html(guessCount);
}

function getFeedBack(event) {
	event.preventDefault();
	var guess = $("#userGuess").val();	

	if(isGuessValid(guess)) {
		console.log("Valid Guess: ", guess);
		
		guessCount++;
		updateGuessCount(guessCount);
		//console.log(guessCount++);
	}
	else {
		$("#feedback").fadeOut("fast");
		$("#feedback").html("You entered &#39;" + guess + "&#39;. <br> Please enter a number from " + min + " to " + max + ".");
		$("#feedback").fadeIn("fast");
	}

	// Set ranges for values (warm or cold) 
	// Don't forget edge cases

	$("#userGuess").val("");
}
