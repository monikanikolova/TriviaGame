//start game function
// var display = $("#question-panel");

// $(document).on("click", "#start-game", function(e){
//     $("#content").prepend("<h2 Time remaining: <span id='counter-number'>30</span> Seconds</h2>");
//     // game.loadQuestion();
//     console.log("you clicked");
    
// });
// $(document).on('click', '.answer-button', function(e) {
//     game.clicked(e);
//   });
// $(document).on("click", "#start-over", function(e){
//     game.reset();
// });

// array of questions
//Load page
//Global Variables

$(document).ready(function(){
//Object with questions and answers
var artTrivia = [
    {
    question: "How many paintings did Vincent Van Gogh sell during his lifetime?",
    choices: ["1", "842", "27", "193"],
    correctAnswer: "1",
    image: "../images/the-red-vineyard-at-arles.jpg"
}, {
    question: " What artist sold a balloon dog for $58.4 million?",
    choices: ["Jeff Koons", "Christopher Wool", "Gerhard Ritcher", "Jasper Johns"],
    correctAnswer: "Jeff Koons",
    image: "../images/balloon-dog.jpg"
}, {
    question: "What is the only work of art Michelangelo ever signed?",
    choices: ["Sistine Chapel Ceiling", "The Pieta", "The Last Judgement", "David"],
    correctAnswer: "The Pieta",
    image: "../images/signed.jpg"
}, {
    question: "How long did it take Leonardo da Vinci to paint the Mona Lisa's lips?",
    choices: ["12 months", "12 days", "12 weeks", "12 years"],
    correctAnswer: "12 years",
    image: "../images/lips.jpg"
}, {
    question: " What painting attracted more visitors to the Louvre Museum AFTER it was stolen?",
    choices: ["Poppy Flowers", "Landscape With An Obelisk", "Mona Lisa", "The Scream"],
    correctAnswer: "Mona Lisa",
    image: "../images/stolen.jpeg"
}];

var rightAnswer;
var incorrectAnswer = 0;
var question = 0;
var questionsAsked = 0;
var clock;
var counter = 30;
var game;
//Start Game button
$("#start-game").click(function() {
    loadQuestion();
    console.log(questionsAsked + "asked");
    
});

//Functions
function timer() {
    clock = setInterval(thirtySeconds, 1000);
};
function thirtySeconds() {
    if (counter === 0 ) {
        clearInterval(clock);
        //unanswered questions as incorrect
        incorrectAnswer++;
        $("#question-panel").empty();
        $("#question-panel").append("<h1>Time Out!</h1>");
        counter = 30;
        wrongOrRight();
        //Move on the next question in 3 sec
        setTimeout(nextQuestion, 3000)
    }
    if (counter > 0 ) {
        counter--;
    }
    $("#timer").html("<h1>Time Remaining: " + counter + "</h1><hr>");
    };
function loadQuestion() {
    $("#timer").html("Time Remaining: " + counter + "</h1><br>");
    var answer = $("#answer-panel");
    answer.empty()
    timer();
    //questions in the div
    $("#start-game").hide();
    game = artTrivia[question];
    $("#question-panel").html("<h3>" + game.question + "</h3><br>");
    for (var i = 0; i < game.choices.length; i++){
        var answerButton = $("<button>");
        answerButton.addClass("answer-button");
        answerButton.attr("data-answer", game.choices[i]);
        answerButton.text(game.choices[i]);
        answer.append(answerButton);
        }
    }
    
function nextQuestion() {
    clearInterval(clock);
    counter = 30;
    question++;

    if (questionsAsked < artTrivia.length) {
        loadQuestion();
    } else {
        score();
    }
}
function wrongOrRight() {
    var answer = $("#answer-panel");
    var question = $("#question-panel");
    answer.empty();
    answer.append("<h3>The correct answer is" + artTrivia[question.correctAnswer] + "</h3>");
    console.log(artTrivia[question.correctAnswer]);
    
    var img = $("<img>");
    img.attr("src", artTrivia[question.image])
    answer.append(img)
}

$("#answer-panel").on("click", ".answer-button", function(){
    clearInterval(clock);
    //Grab button value
    var clickedButton = $(this).attr("data-answer")
    console.log(clickedButton);
    console.log(questionsAsked+ " asked");
    //Check for correct
    if (clickedButton == game.correctAnswer) {
        rightAnswer++;
        $("#question-panel").empty();
        $("#question-panel").append("<h1>Correct</h1>")
        console.log(rightAnswer + "right;" + incorrectAnswer + "wrong");
        wrongOrRight();
        setTimeout(nextQuestion, 3000)
    } else if (clickedButton != game.correctAnswer){
        incorrectAnswer++;
        $("#question-panel").empty();
        $("#question-panel").append("<h1>Incorrect</h1>")
        console.log(rightAnswer + "right;" + incorrectAnswer + "wrong");
        wrongOrRight();
        setTimeout(nextQuestion,3000)
    }        
});
function score() {
    $("#timer").empty();
    $("#question-panel").empty();
    $("#answer-panel").empty();
    $("#question-panel").append("<h1>Final Score:<h1>" + rightAnswer + "/10</h>");
    restartGame();
}
function restartGame () {
    var restartGameButton = $("<button>");
    restartGameButton.addClass("restart-game");
    restartGameButton.text("Play Again!");
    $("#timer").append(restartGameButton, "<hr>");
    $(restartGameButton).click(function() {
        location.reload();
    });
}
});


//click events

// // questions/ inner loop for answers
// var game = {
//     questions:questions,
//     currentQuestion:0,
//     counter:30,
//     correct:0,
//     incorrect:0,
//     timeCounter: function (){
//         game.counter--;
//         $("#counter-time").html(game.counter);

//         if (game.counter === 0);
//         game.timeIsUp();
//     }
// }
//  loadQuestion: function(){
//      timer= setInterval(game.timeCounter, 1000);
//      display.html("<h2>" + questions[this.currentQuestion].question+ "</h2>");
//      for(var i = 0; i<questions[this.currentQuestion].answers.length; i++){
//          display.append("<button class='answer-button' id = 'button'' + data-name >")
//      }
//  }
//  nextQuestion: function(){
//      game.counter = 30;
//      $("#counter-number").html(game.counter);
//      game.currentQuestion++;
//      game.loadQuestion();
//  }
//      timeIsUp: function (){
//          clearInterval(timer);
//          $("#counter-number").html(game.counter);

//          display.html("<h2>Time is Up!</h2>")
//          display.append("<h3>The correct answer was: </h3>" + questions[this.currentQuestion].correctAnswer);  
//         if (game.currentQuestion === questions.length - 1) {
//             setTimeout(game.results, 3*1000);
//         } else {
//             setTimeout(game.nextQuestion, 3*1000);
//         }
//         },
//         results: function() {
//             clearInterval(timer);
//             display.html("<h2>Final results</h2>");
//             $("#counter-number").html(game.counter);
//             display.append("<h3>Correct: " + game.correct + "</h3>");
//             display.append("<h3>Incorrect: " + game.incorrect + "</h3>");
//             display.append("<h3>Unanswerd: " + (questions.length - (game.correct+game.incorrect))+ "</h3>");
//             display.append("<br><button=id'start-over'>Play Again?</button>");
//         }
//         clicked: function(e) {
//             clearInterval(timer);
//             if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
//                 this.answeredCorrectly();
//             } else {
//                 this.answeredIncorrectly();
//             }
//         }
//         answeredIncorrectly: function(){
//             game.incorrect++;
//             clearInterval(timer);
//             display.html("<h2>Not Correct!</h2>");
//             display.append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
//             display.append("<img src='" + questions[game.currentQuestion].image + "'/>");

//             if(game.currentQuestion === questions.length - 1) {
//                 setTimeout(game.results, 3 * 1000);
//             } else {
//                 setTimeout (game.nextQuestion, 3 * 1000);
//             }
//         }
//         answeredCorrectly: function() {
//             clearInterval(timer);
//             game.correct++;
//             display.html("<h2>Correct!</h2>");
//             display.append("<img src='"+ questions[game.currentQuestion].image +"'/>");
//              if (game.currentQuestion === questions.length - 1) {
//                  setTimeout(game.results, 3 * 1000);
//              } else {
//                  setTimeout(game.nextQuestion, 3 * 1000);
//              }
//         }
//         reset: function() {
//             this.currentQuestion = 0;
//             this.counter = 0;
//             this.counter = 0;
//             this.incorrect = 0;
//             this.loadQuestion();
//         }
