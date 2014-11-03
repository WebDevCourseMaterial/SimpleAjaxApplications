/** namespace. */
var rh = rh || {};
rh.mq = rh.mq || {};

$(document).ready( function() {
  var quizStatController = new rh.mq.QuizStatsController();
  
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
  
  var quizQuestionController = new rh.mq.QuizQuestionController(data["questions"], $("#question-container"), function(wasCorrect) {
    quizStatController.questionAnswered(wasCorrect);
  });
  
});
