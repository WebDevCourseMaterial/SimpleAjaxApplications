rh.mq.MovieQuotesQuizController = function() {
  this.quizStatController = new rh.mq.QuizStatsController();
  
  var questionPerRound = localStorage.questionPerRound;
  if (questionPerRound) {
    questionPerRound = 10;
    localStorage.questionPerRound = 10;
  }
  if (questionPerRound != 10) {
    // TODO: Update the appropriate class in the dropdown.
  }
  
  // TODO: Get questions from the server!
  var data = {"questions": [{"quote": "I'll be back", "movie": "The Terminator", "incorrects": ["Big", "The Matrix", "Eragon"]},
                            {"quote": "Hello killed father", "movie": "The Princess Bride", "incorrects": ["The Terminator", "Terminator 2", "Terminator 3"]},
                            {"quote": "Hi I'm Olaf and I love warm hugs", "movie": "Frozen", "incorrects": ["Big Mommas House", "Reservoir dogs", "The Big Lebowski"]},
                            {"quote": "I'll be back", "movie": "The Terminator", "incorrects": ["Big", "The Matrix", "Eragon"]},
                            {"quote": "Hello killed father", "movie": "The Princess Bride", "incorrects": ["The Terminator", "Terminator 2", "Terminator 3"]},
                            {"quote": "Hi I'm Olaf and I love warm hugs", "movie": "Frozen", "incorrects": ["Big Mommas House", "Reservoir dogs", "The Big Lebowski"]},
                            {"quote": "I'll be back", "movie": "The Terminator", "incorrects": ["Big", "The Matrix", "Eragon"]},
                            {"quote": "Hello killed father", "movie": "The Princess Bride", "incorrects": ["The Terminator", "Terminator 2", "Terminator 3"]},
                            {"quote": "Hi I'm Olaf and I love warm hugs", "movie": "Frozen", "incorrects": ["Big Mommas House", "Reservoir dogs", "The Big Lebowski"]},
                            {"quote": "I'll be back", "movie": "The Terminator", "incorrects": ["Big", "The Matrix", "Eragon"]},
                            {"quote": "Hello killed father", "movie": "The Princess Bride", "incorrects": ["The Terminator", "Terminator 2", "Terminator 3"]},
                            {"quote": "Hi I'm Olaf and I love warm hugs", "movie": "Frozen", "incorrects": ["Big Mommas House", "Reservoir dogs", "The Big Lebowski"]},
                            {"quote": "I'll be back", "movie": "The Terminator", "incorrects": ["Big", "The Matrix", "Eragon"]},
                            {"quote": "Hello killed father", "movie": "The Princess Bride", "incorrects": ["The Terminator", "Terminator 2", "Terminator 3"]},
                            {"quote": "Hi I'm Olaf and I love warm hugs", "movie": "Frozen", "incorrects": ["Big Mommas House", "Reservoir dogs", "The Big Lebowski"]}]}
  
  var movieQuotesQuizController = this;
  this.quizQuestionController = new rh.mq.QuizQuestionController(data["questions"], $("#question-container"), function(wasCorrect) {
    movieQuotesQuizController.quizStatController.questionAnswered(wasCorrect);
  });
  
  $(".dropdown-menu a").click(function() {
    console.log("You clicked " + $(this).text());
    $(".dropdown-menu a").removeClass("active");
    $(this).addClass("active");
  });

  $("#reset-stats").click(function() {
    movieQuotesQuizController.quizStatController.resetStats();
  });  

  $("#new-questions").click(function() {
    
    movieQuotesQuizController.quizStatController.resetStats();
  });  
}
