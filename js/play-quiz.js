const typeHira = document.getElementById("quizHira");
const typeKata = document.getElementById("quizKata");

// =======================================================================================

let userQuizSelection;

// =======================================================================================

const quizTypes = [
  { htmlEl: typeHira, dataName: "data/hiragana.json" },
  { htmlEl: typeKata, dataName: "data/katakana.json" },
];

quizTypes.forEach((type) => {
  type.htmlEl.addEventListener("click", function (event) {
    fetch(type.dataName)
      .then((res) => {
        return res.json();
      })
      .then((loadedData) => {
        console.log("quiz type: ", type.dataName);
        console.log("data: ", loadedData);
        console.log("details: ", loadedData.length);
      });
  });
});
