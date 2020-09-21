const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const clearScores = document.getElementById("clearBtn");
const noScores = document.getElementById("noScores");

// =======================================================================================

if (highScores.length < 1) {
  highScoresList.classList.add("hidden");
  noScores.classList.remove("hidden");
} else {
  highScoresList.classList.remove("hidden");
  noScores.classList.add("hidden");

  highScoresList.innerHTML = highScores
    .map((score) => {
      return `<li class="high-score"><span class="score-item">${
        highScores.indexOf(score) + 1
      }位</span> | <span class="score-item">${
        score.date
      }</span> | <span class="score-item">${
        score.name
      }</span> | <span class="score-item">${score.score}点</span></li>`;
    })
    .join("");
}

clearScores.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.clear();

  highScoresList.classList.add("hidden");
  noScores.classList.remove("hidden");
  highScoresList.innerHTML = [];
});
