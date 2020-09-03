const typeHira = document.getElementById("quizHira");
const typeKata = document.getElementById("quizKata");

// =======================================================================================

let userQuizSelection;

// =======================================================================================

const quizTypes = [
  { htmlEl: typeHira, dataName: "hiragana", quizType: "ひらがな" },
  { htmlEl: typeKata, dataName: "katakana", quizType: "カタカナ" },
];

quizTypes.forEach((type) => {
  type.htmlEl.addEventListener("click", function (event) {
    fetch(`data/${type.dataName}.json`)
      .then((res) => {
        return res.json();
      })
      .then((loadedData) => {
        console.log("quiz type: ", type.quizType);
        console.log("data: ", loadedData);
        console.log("details: ", loadedData.length);
      });
  });
});
