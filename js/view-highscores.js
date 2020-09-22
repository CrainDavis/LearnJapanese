const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const listLabels = document.getElementById("listLabels");

const clearScores = document.getElementById("clearBtn");
const noScores = document.getElementById("noScores");

// =======================================================================================

if (highScores.length < 1) {
  highScoresList.classList.add("hidden");
  listLabels.classList.add("hidden");
  clearScores.classList.add("hidden");
  noScores.classList.remove("hidden");
} else {
  highScoresList.classList.remove("hidden");
  listLabels.classList.remove("hidden");
  clearScores.classList.remove("hidden");
  noScores.classList.add("hidden");

  highScoresList.innerHTML = highScores
    .map((score) => {
      
      let hr;
      if (highScores.indexOf(score) === highScores.length - 1) {
        hr = '<hr class="hidden">';
      } else {
        hr = '<hr class="hr">';
      };

      return `<li class="high-score"><span class="score-item">${
        highScores.indexOf(score) + 1
      }位</span><span class="score-item">${
        score.date
      }</span><span class="score-item">${
        score.name
      }</span><span class="score-item">${
        score.quizType
      }</span><span class="score-item">${score.score}点</span></li>${hr}`;
    })
    .join("");
}

clearScores.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.clear();

  highScoresList.classList.add("hidden");
  listLabels.classList.add("hidden");
  clearScores.classList.add("hidden");
  noScores.classList.remove("hidden");
  highScoresList.innerHTML = [];
});
