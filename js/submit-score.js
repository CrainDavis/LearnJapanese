const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

// =======================================================================================

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

finalScore.innerText = mostRecentScore;

// =======================================================================================

saveHighScore = (event) => {
  event.preventDefault();
  console.log("save score button clicked!");
};
