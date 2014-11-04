rh.mq.QuizStatsController = function(questionsPerRound) {
  this.totalCorrect = parseInt(localStorage.totalCorrect || 0);
  this.totalIncorrect = parseInt(localStorage.totalIncorrect || 0);
  this.newRound();
};

rh.mq.QuizStatsController.prototype.newRound = function(questionsPerRound) {
  $("#questions-per-round").text(questionsPerRound);
  this.correctThisRound = 0;
  this.updateDisplays();
};

rh.mq.QuizStatsController.prototype.resetStats = function() {
  this.correctThisRound = 0;
  this.totalCorrect = 0;
  this.totalIncorrect = 0;
  localStorage.totalCorrect = this.totalCorrect; 
  localStorage.totalIncorrect = this.totalIncorrect;
  $("#percentage-correct").text(100);
  this.updateDisplays();
};

rh.mq.QuizStatsController.prototype.questionAnswered = function(wasCorrect) {
  if (wasCorrect) {
    this.totalCorrect++;
    this.correctThisRound++;
    localStorage.totalCorrect = this.totalCorrect; 
  } else {
    this.totalIncorrect++;
    localStorage.totalIncorrect = this.totalIncorrect;
  }
  this.updateDisplays();
};

rh.mq.QuizStatsController.prototype.updateDisplays = function() {
  $("#correct-this-round").text(this.correctThisRound);
  $("#total-correct").text(this.totalCorrect);
  $("#total-incorrect").text(this.totalIncorrect);
  var total = this.totalCorrect + this.totalIncorrect;
  if (total > 0) {
    var percentage = this.totalCorrect / total * 100;
    $("#percentage-correct").text(percentage.toFixed(1));
  }
  
};