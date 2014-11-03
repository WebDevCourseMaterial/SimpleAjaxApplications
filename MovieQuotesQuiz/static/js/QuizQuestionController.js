rh.mq.QuizQuestionController = function(questionArray, $container, callback) {
  this.$container = $container;
  this.callback = callback;
  this.displayNewQuestions(questionArray);
};

rh.mq.QuizQuestionController.prototype.displayNewQuestions = function(questionArray) {
  this.questionArray = questionArray;

  var $questionContent = $("<div></div>")
  for (var i = 0; i < questionArray.length; ++i) {
    var $question = this.createNewQuestionForData(i);
    $question.appendTo($questionContent);
  }
  $("#question-container").html($questionContent);
  
  var quizQuestionController = this;
  $(".final-answer").click( function() {
    quizQuestionController.handleAnswer($(".final-answer").index(this));
  });
};


rh.mq.QuizQuestionController.prototype.createNewQuestion = function(questionNumber) {
  var questionData = this.questionArray[questionNumber];
  var $question = $('#question-template').clone().attr('id', "question" + questionNumber).removeClass("hidden");
  $question.find(".quote").text(questionData["quote"]);
  var correctIndex = Math.floor(Math.random() * 4);
  $question.find("input").attr("name", "question" + questionNumber).each(function( index, element ) {
    if (index == correctIndex) {
      $("<span class='correct'>" + questionData["movie"] + "</span>").insertAfter(element);
      questionData["correctIndex"] = correctIndex;
    } else {
      $("<span class='incorrect'>" + questionData["incorrects"].pop() + "</span>").insertAfter(element);  
    }
  });
  return $question
};

rh.mq.QuizQuestionController.prototype.handleAnswer = function(questionNumber) {
  console.log("Attempt to answer question " + questionNumber);
  var questionData = this.questionArray[questionNumber];
  console.log("Correct answer is " + questionData["correctIndex"]);
  console.log("Your answer is ???");
  
  
};