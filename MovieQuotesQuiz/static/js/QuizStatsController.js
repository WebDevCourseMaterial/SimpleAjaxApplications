rh.mq.QuizStatsController = function() {
  this.totalCorrect = localStorage.totalCorrect || 0
  this.totalIncorrect = localStorage.totalIncorrect || 0;
  this.updateDisplays();
};

rh.mq.QuizStatsController.prototype.questionAnswered = function(wasCorrect) {
  if (wasCorrect) {
    console.log("You just got something RIGHT!");
    this.totalCorrect++;
    localStorage.totalCorrect = this.totalCorrect; 
  } else {
    console.log("You just got something Wrong!");
    this.totalIncorrect++;
    localStorage.totalIncorrect = this.totalIncorrect;
  }
  this.updateDisplays();
};

rh.mq.QuizStatsController.prototype.updateDisplays = function() {
  $("#total-correct").text(this.totalCorrect);
  $("#total-incorrect").text(this.totalIncorrect);
  var total = this.totalCorrect + this.totalIncorrect;
  if (total > 0) {
    var percentage = this.totalCorrect / total * 100;
    $("#percentage-right").text(percentage.toFixed(1));
  }
  
};