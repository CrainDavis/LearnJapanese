const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");

const typeHira = document.getElementById("quizHira");
const typeKata = document.getElementById("quizKata");

const quizSelectionContainer = document.getElementById(
  "quizSelectionContainer"
);
const gamePlayContainer = document.getElementById("gamePlayContainer");

// =======================================================================================

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let CORRECT_BONUS = 1;
let MAX_QUESTIONS = 3;

// =======================================================================================

let questions = [];
let quizSelection = "";

// =======================================================================================

window.onload = function () {
  quizSelectionContainer.classList.remove("hidden");
  gamePlayContainer.classList.add("hidden");

  MAX_QUESTIONS = 3;
  quizSelection = "";
};

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

        quizSelectionContainer.classList.add("hidden");
        gamePlayContainer.classList.remove("hidden");

        questions = loadedData;
        MAX_QUESTIONS = loadedData.length;
        quizSelection = type.quizType;
        startGame();
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
});

// =======================================================================================

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  // check to see if quiz is finished
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    localStorage.setItem("mostRecentQuizType", quizSelection);
    return window.location.assign("submit-score.html");
  }

  // increment score and progress bar
  questionCounter++;
  progressText.innerText = `問題 ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // display random question from data
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // display answer choices
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // remove used questions from array
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", function (event) {
    // prevent user from clicking buttons until app is ready
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    // get the user's selection
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // display correct/incorrect answer
    let textClassToApply = "incorrect-text";
    let prefixClassToApply = "incorrect-prefix";

    if (selectedAnswer == currentQuestion.answer) {
      textClassToApply = "correct-text";
      prefixClassToApply = "correct-prefix";
    }

    // increment score for correct answers
    if (textClassToApply === "correct-text") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.classList.add(textClassToApply);
    selectedChoice.previousElementSibling.classList.add(prefixClassToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(textClassToApply);
      selectedChoice.previousElementSibling.classList.remove(
        prefixClassToApply
      );

      // get new question
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = `${score}点`;
};
