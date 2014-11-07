rh.mq.QuizQuestionController = function(questionArray, $container, callback) {
  this.$container = $container;
  this.callback = callback;
  
  if (questionArray.length > 0) {
    this.displayNewQuestions(questionArray);
  }
  
  this.correctAudioElement = document.createElement('audio');
  this.correctAudioElement.setAttribute('src', '/static/audio/243701__ertfelda__correct.wav');
 
  this.incorrectAudioElement = document.createElement('audio');
  this.incorrectAudioElement.setAttribute('src', '/static/audio/142608__autistic-lucario__error.wav');
};


rh.mq.QuizQuestionController.prototype.displayNewQuestions = function(questionArray) {
  this.questionArray = questionArray;

  var $questionContent = // TODO: Create a new div
  
  for (var i = 0; i < questionArray.length; ++i) {
    var $question = this.createNewQuestion(i);
    $question.appendTo($questionContent);
  }
  $("#question-container").html($questionContent);
  
  var quizQuestionController = this;
  $("input[type=radio]").click( function() {
    var inputIndex = $("input").index(this);
    var questionNumber = Math.floor(inputIndex / 4);
    var answerIndex = inputIndex % 4;
    quizQuestionController.handleAnswer(questionNumber, answerIndex, this);
  });
};


rh.mq.QuizQuestionController.prototype.createNewQuestion = function(questionNumber) {
  var questionData = this.questionArray[questionNumber];
  
  // TODO: Create a new question clone.
  // clone #question-template, set the id to "question" + questionNumber, remove the class hidden
  
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


rh.mq.QuizQuestionController.prototype.handleAnswer = function(questionNumber, answerIndex, inputElement) {
  var questionData = this.questionArray[questionNumber];
  if (answerIndex == questionData["correctIndex"]) {
    this.correctAudioElement.play();
  } else {
    $(inputElement).parents(".radio").addClass("bg-danger");
    this.incorrectAudioElement.play();
  }
  var $question = $(inputElement).parents(".question");
  $question.find("input").prop("disabled", true );  
  $question.find(".radio:nth-child(" + (questionData["correctIndex"] + 1) + ")").addClass("bg-success");
  this.callback(answerIndex == questionData["correctIndex"]);
};
