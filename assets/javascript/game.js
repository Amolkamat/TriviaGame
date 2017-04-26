var stopwatch = {
	number: 31,
	run: function () {
		counter = setInterval(stopwatch.increment, 1000);
	},
	increment: function() {
		stopwatch.number--;
      	$('#show-number').html('<h2>' + stopwatch.number + '</h2>');
      	if (stopwatch.number === 0){
        	stopwatch.stop();
		}
	},
	stop: function() {
		clearInterval(counter);
	}
};

var quiz = [ {
		question: "Who's that Pokemon?",
		picture: "assets/images/pikachu.png",
		choices: ['Bulbasaur','Pikachu','Chansey','Diglet'],
		correct: 1,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/alakazam.png',
		choices: ['Mewtwo','Weedle','Metapod','Alakazam'],
		correct: 3,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/scyther.png',
		choices: ['Beedrill','Victreebel','Scyther','Pidgeot'],
		correct: 2,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/magmar.png',
		choices: ['Magmar','Charmeleon','Koffing','Snorlax'],
		correct: 0,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/ditto.png',
		choices: ['Grimer','Ekans','Hitmonlee','Ditto'],
		correct: 3,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/zapdos.png',
		choices: ['Articuno','Moltres','Zapdos','Lugia'],
		correct: 2,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/haunter.png',
		choices: ['Vulpix','Zubat','Haunter','Venonat'],
		correct: 2,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/growlithe.png',
		choices: ['Growlithe','Gyarados','Pinsir','Meowth'],
		correct: 0,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/vileplume.png',
		choices: ['Tentacool','Muk','Shellder','Vileplume'],
		correct: 3,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/exeggutor.png',
		choices: ['Exeguutor','Mr. Mime','Venusaur','Clefable'],
		correct: 0,
	},
	{	question: "Who's that Pokemon?",
		picture: 'assets/images/mew.png',
		choices: ['Drowzee','Mew','Kingler','Dratini'],
		correct: 1,
}];

var numQuestions = quiz.length;
var numCorrect = 0;
var counter = 0;

var pokePic = $('<img>');



$('input[name="choice"]').hide;

// display question function
function nextQuest(){

	$('#questions').text(quiz[counter].question);
	pokePic.attr('src', quiz[counter].picture)
	$('#pokes').append(pokePic)
	$('#answer0').text(quiz[counter].choices[0]);
	$('#answer1').text(quiz[counter].choices[1]);
	$('#answer2').text(quiz[counter].choices[2]);
	$('#answer3').text(quiz[counter].choices[3]);
}


// client-sided validation
function validate() {
	if ($('input').is(':checked')) {

		nextQuest(); // display next question
	}
	else {
		alert("Please make a selection.");
		counter--;
	}
}

// display first question
nextQuest();


// next button function
$('#nextBtn').on('click', function() {
	var answer = ($('input[name="choice"]:checked').val());

	// increment score if answer is correct
	if (answer == quiz[counter].correct) {
		numCorrect++;
	}

	counter++;


	// display score screen
	if (counter >= numQuestions) {
		$('#main').hide().fadeIn("slow");
		document.getElementById('main').innerHTML="Quiz Complete! You scored " + numCorrect + " out of " + numQuestions + "!";
		return; // returns false *(there has to be a better way! figure it out.)*
	}

	validate();

	// fade in new question
	$('.card').hide().fadeIn("slow");
	
	// clear previous selection
	$('input[name="choice"]').prop('checked', false);
});


// back button function
$('#backBtn').on('click', function() {
	if (quiz[counter] == 0) {
		$('.card').hide().fadeIn("slow");

	} else {
		// fade out current question and fade in previous question
		$('.card').hide().fadeIn("slow");
		numCorrect--;
		counter--;
	}

	
	function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}
	// display previous question
	nextQuest();	
});
