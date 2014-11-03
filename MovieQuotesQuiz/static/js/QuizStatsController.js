rh.mq.QuizStatsController = function() {
  
};

rh.mq.QuizStatsController.prototype.questionAnswered = function(wasCorrect) {
  if (wasCorrect) {
    console.log("You just got something RIGHT!");
  } else {
    console.log("You just got something Wrong!");
  }
}