$(document).ready(function(){

	var min = 1;
	var max = 100;
	var answer;
	var firstGuess;
	var previousDiff;
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
		$("#feedback").hide();
		$("#feedback").fadeIn(500);
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

	function userWins() {
		setFeedBack("Correct! You've won the game!");
		gameFinished = true;
	}

	function newGame() {
		guessCount = 0;
		gameFinished = false;
		answer = getRandomInt(min, max);
		firstGuess = true;
		setFeedBack("Make your Guess!");
		$("#userGuess").focus();
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
			$(".new").focus();		
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
		
		if(firstGuess) {			
			if(diff === 0) {
				userWins();
			} else if(diff <= 5) {
				setFeedBack("Your guess is in very hot territory!");
			} else if(diff <= 10) {
				setFeedBack("Your guess is in hot terrain!");
			} else if(diff <= 20) {
				setFeedBack("Your guess is in a warm area!");
			} else if(diff <= 30) {
				setFeedBack("Your guess is in cold terrain!");
			} else if(diff <= 40) {
				setFeedBack("Your guess is in very cold territory!");
			} else {
				setFeedBack("Your guess is freezing cold!");
			}

			previousDiff = diff;
			firstGuess = false;

		} else {
			if(diff === 0) {				
				userWins();
			} else if(previousDiff === diff) {
				setFeedBack("Neither colder nor warmer.");
			}
			else if(previousDiff < diff) {
				setFeedBack("Getting Colder!");
			} else {
				setFeedBack("Getting Warmer!");
			}
			previousDiff = diff;
		}

		$("#count").html(++guessCount);
		$("#guessList").prepend("<li>" + userGuess + "</li>");
	}
	
});