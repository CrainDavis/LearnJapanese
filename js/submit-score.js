const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

// =======================================================================================

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 10;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

finalScore.innerText = mostRecentScore;

// =======================================================================================

saveHighScore = (event) => {
  event.preventDefault();

  // items saved in local storage
  const score = {
    score: mostRecentScore,
    name: username.value,
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
