rh.mq.MovieQuotesQuizController = function() {
  var movieQuotesQuizController = this;
  this.quizStatController = new rh.mq.QuizStatsController();
  this.quizQuestionController = new rh.mq.QuizQuestionController([], $("#question-container"), function(wasCorrect) {
    movieQuotesQuizController.quizStatController.questionAnswered(wasCorrect);
  });
  
  var htmlDefaultQuestionPerRound = parseInt($(".dropdown-menu a.active").text());
  var questionPerRound = localStorage.questionPerRound;
  if (!questionPerRound) {
    console.log("Nothing in localStorage.questionPerRound setting to " + htmlDefaultQuestionPerRound);
    questionPerRound = htmlDefaultQuestionPerRound;
    localStorage.questionPerRound = htmlDefaultQuestionPerRound;
  }
  if (questionPerRound != htmlDefaultQuestionPerRound) {
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
  this.attachEventHandlers();
};


rh.mq.MovieQuotesQuizController.prototype.fetchQuestions = function() {
  var questionPerRound = parseInt($(".dropdown-menu a.active").text());
  // TODO: Implement
  
};


rh.mq.MovieQuotesQuizController.prototype.attachEventHandlers = function() {
  $('#ajax-quote-modal').on('shown.bs.modal', function() {
    $("input[name=quote]").focus();
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
  
  $("#show-add-modal").click(function() {
    $("#movie-input").val("");
    $("#quote-input").val("");
  });
  
  $("#add-quote-button").click(function() {
    // TODO: Implement
    
  });
};
