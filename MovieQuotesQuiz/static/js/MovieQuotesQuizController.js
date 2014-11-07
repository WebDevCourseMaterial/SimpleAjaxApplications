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

rh.mq.MovieQuotesQuizController.prototype.hideNavbar = function() {
  $navbar = $(".collapse.navbar-collapse");
  if ($navbar.hasClass("in")) {
    $navbar.collapse('hide');
  }
};

rh.mq.MovieQuotesQuizController.prototype.fetchQuestions = function() {
  var movieQuotesQuizController = this;
  var questionPerRound = parseInt($(".dropdown-menu a.active").text());
  
  // TODO: Get questions using an AJAX GET
  // When complete perform these actions:
  //  - displayNewQuestions with the quizQuestionController using the questions array.
  //  - create a newRound with the quizStatsController
  //  - scroll the window to the top
  
  $.getJSON("/quizquestions", {"questions": questionPerRound})
  .done(function(json) {
    console.log("JSON Data: " + JSON.stringify(json));
    movieQuotesQuizController.quizQuestionController.displayNewQuestions(json.questions);
    movieQuotesQuizController.quizStatController.newRound(questionPerRound);
    $(window).scrollTop(0);
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
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
    movieQuotesQuizController.hideNavbar();
  });

  $("#reset-stats").click(function() {
    movieQuotesQuizController.quizStatController.resetStats();
    movieQuotesQuizController.fetchQuestions();
    movieQuotesQuizController.hideNavbar();
  });  

  $("#new-questions").click(function() {
    movieQuotesQuizController.fetchQuestions();
    movieQuotesQuizController.hideNavbar();
  });
  
  $("#show-add-modal").click(function() {
    $("#movie-input").val("");
    $("#quote-input").val("");
    movieQuotesQuizController.hideNavbar();
  });
  
  $("#add-quote-button").click(function() {
    var movie = $("#movie-input").val();
    var quote = $("#quote-input").val();
    var moviequote = {"quote": quote, "movie": movie, "api": "json"};
    console.log("YOU clicked on add quote with " + JSON.stringify(moviequote));
    
    // TODO: Send the data using an AJAX post.
    // When complete simply log the response nothing more.
    
  });
};
