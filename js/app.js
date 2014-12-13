$(document).ready(function(){

	var min = 1;
	var max = 100;
	var answer;
	var guessCount;
	var gameFinished;

	newGame();

	/*--- Display information modal box ---*/
	$(".what").click(function(){
	$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

	/*--- Start a new game ---*/
	$(".new").click(newGame);

	/*--- Display feedback to user ---*/
	$("#guess-form").submit(displayFeedBack);


	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	} 

	function setFeedBack(feedBack) {
		$("#feedback").html(feedBack);
	}

	function stringToNumber(str) {
		return +$.trim(str);
	}

	function isGuessValid(userGuess) {
		if(userGuess.indexOf(".") != -1){
			return false;
		}
		
		userGuess = stringToNumber(userGuess);		
		if(!userGuess || userGuess < min || userGuess > max ) {		
			return false;		
		}	
			
		return true;
	}

	function newGame() {
		guessCount = 0;
		gameFinished = false;
		answer = getRandomInt(min, max);
		setFeedBack("Make your Guess!");
		$("#count").html(guessCount); 
		$("#guessList").empty();

		console.log("New Game Answer: ", answer);
	}

	function displayFeedBack(event) {
		event.preventDefault();
		var userGuess = $("#userGuess").val();	
		$("#userGuess").val("");

		if(gameFinished) {
			setFeedBack("You've already won the game! Press +New Game to play again.");			
			return;
		}

		if(!isGuessValid(userGuess)) {		
			setFeedBack("You entered &#39;" + userGuess + "&#39;. <br>" +
				        "Please enter a non-decimal number from " +
				        min + " to " + max + ".");
			return;
		}

		userGuess = stringToNumber(userGuess);
		var diff = Math.abs(answer - userGuess);

		if(diff === 0) {
			setFeedBack("Correct! You've won the game!");
			gameFinished = true;
		} else if(diff <= 5) {
			setFeedBack("Your guess is getting too hot!");
		} else if(diff <= 10) {
			setFeedBack("You guess is getting hot!");
		} else if(diff <= 20) {
			setFeedBack("You guess is getting warm!");
		} else if(diff <= 30) {
			setFeedBack("You guess is getting cold!");
		} else if(diff <= 40) {
			setFeedBack("You guess is getting very cold!");
		} else {
			setFeedBack("You guess is getting freezing!");
		}

		$("#count").html(++guessCount);
		$("#guessList").prepend("<li>" + userGuess + "</li>");
	}
	
});