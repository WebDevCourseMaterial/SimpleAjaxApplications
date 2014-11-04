rh.mq.MovieQuotesQuizController = function() {
  var movieQuotesQuizController = this;
  this.quizStatController = new rh.mq.QuizStatsController();
  this.quizQuestionController = new rh.mq.QuizQuestionController([], $("#question-container"), function(wasCorrect) {
    movieQuotesQuizController.quizStatController.questionAnswered(wasCorrect);
  });
  
  var questionPerRound = localStorage.questionPerRound;
  if (!questionPerRound) {
    console.log("Nothing in localStorage.questionPerRound setting to 10");
    questionPerRound = 10;
    localStorage.questionPerRound = 10;
  }
  console.log("questionPerRound = " + questionPerRound);
  if (questionPerRound != 10) {
    console.log("Default was not 10 active to " + questionPerRound);
    questionPerRound = parseInt(questionPerRound);
    $(".dropdown-menu a").removeClass("active");
    $(".dropdown-menu a").each( function(index, element) {
      if (parseInt($(element).text()) == questionPerRound) {
        $(element).addClass("active");
      }
    });
  }
  this.fetchQuestions();
  this.enableButtons();
};



rh.mq.MovieQuotesQuizController.prototype.fetchQuestions = function() {
  // $.get("/quizquestions?questions=" + questionPerRound, function(data, status) {
  // console.log("Data: " + data.questions + "\nStatus: " + status);
  // });
  var movieQuotesQuizController = this;

  var questionPerRound = parseInt($(".dropdown-menu a.active").text());
  console.log("questionPerRound = " + questionPerRound);
  
  
  $.getJSON("/quizquestions", {"questions": questionPerRound})
  .done(function(json) {
    console.log("JSON Data: " + JSON.stringify(json));
    movieQuotesQuizController.quizQuestionController.displayNewQuestions(json.questions);
    movieQuotesQuizController.quizStatController.newRound(questionPerRound);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
};

rh.mq.MovieQuotesQuizController.prototype.enableButtons = function() {
  var movieQuotesQuizController = this;
  $(".dropdown-menu a").click(function() {
    $(".dropdown-menu a").removeClass("active");
    $(this).addClass("active");
    movieQuotesQuizController.fetchQuestions();
    localStorage.questionPerRound = parseInt($(this).text()); 
  });

  $("#reset-stats").click(function() {
    movieQuotesQuizController.quizStatController.resetStats();
    movieQuotesQuizController.fetchQuestions();
  });  

  $("#new-questions").click(function() {
    movieQuotesQuizController.fetchQuestions();
  });  
}
