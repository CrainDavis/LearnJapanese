const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

const typeHira = document.getElementById("quizHira");
const typeKata = document.getElementById("quizKata");

// =======================================================================================

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// =======================================================================================

let questions = [
  {
    question: "あ",
    choice1: "a",
    choice2: "i",
    choice3: "u",
    choice4: "e",
    answer: 1,
  },
  {
    question: "が",
    choice1: "ka",
    choice2: "ga",
    choice3: "ge",
    choice4: "go",
    answer: 2,
  },
  {
    question: "りゅ",
    choice1: "ryo",
    choice2: "ri",
    choice3: "ryu",
    choice4: "rya",
    answer: 3,
  },
];

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

// =======================================================================================

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("submit-score.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

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

startGame();
