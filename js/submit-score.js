const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const mostRecentQuizType = localStorage.getItem("mostRecentQuizType");
const finalScore = document.getElementById("finalScore");

// =======================================================================================

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 10;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
  saveScoreBtn.disabled = username.value.length > 10;
});

finalScore.innerText = mostRecentScore;

// =======================================================================================

saveHighScore = (event) => {
  event.preventDefault();

  // create a date to be stored
  let currentDate = new Date().toJSON().slice(5, 10).replace(/-/g, "/");

  // items saved in local storage
  const score = {
    score: mostRecentScore,
    name: username.value,
    date: currentDate,
    quizType: mostRecentQuizType,
  };

  // push items into array
  highScores.push(score);

  // sort scores in order from highest to lowest
  highScores.sort((a, b) => b.score - a.score);

  // only save ten best scores
  highScores.splice(10);

  // save new items in local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // navigate to high scores page
  window.location.assign("view-highscores.html");
};
