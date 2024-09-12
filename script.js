import { questions } from "./question.js";

let guessedLetters = [];
let wrongAttempts;
let maxAttempts = 6;
let answerCurrent;
let currentQuestion;
const body = document.body;

const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 400;
const ctx = canvas.getContext("2d");

const hangmanParts = [
  drawHead,
  drawBody,
  drawLeftArm,
  drawRightArm,
  drawLeftLeg,
  drawRightLeg,
];

function initGame() {
  body.innerHTML = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGallows();

  const randomQuestion = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomQuestion];
  console.log(currentQuestion);

  answerCurrent = Array(currentQuestion.answer.length).fill("_");
  wrongAttempts = 0;
  guessedLetters = [];
  console.log(answerCurrent);

  const container = document.createElement("div");
  container.classList.add("container");

  const questionElement = document.createElement("h2");
  questionElement.textContent = currentQuestion.question;

  const wordElement = document.createElement("div");
  wordElement.classList.add("word");
  wordElement.textContent = answerCurrent.join(" ");

  const keyboardElement = document.createElement("div");
  keyboardElement.classList.add("keyboard");
  createKeyboard(keyboardElement);

  body.appendChild(container);
  container.appendChild(questionElement);
  container.appendChild(wordElement);
  container.appendChild(canvas);
  container.appendChild(keyboardElement);

  document.addEventListener("keydown", handleKeyPress);
}

function createKeyboard(container) {
  const alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ".split("");
  alphabet.forEach((letter) => {
    const button = document.createElement("button");
    button.classList.add("keyboard__button");
    button.id = `letter-${letter}`;
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter));
    container.appendChild(button);
  });
}
function handleKeyPress(e) {
  const letter = e.key.toUpperCase();
  if (/[А-Я]/.test(letter) && !guessedLetters.includes(letter)) {
    console.log(letter);
    handleGuess(letter);
  }
}
function handleGuess(letter) {
  guessedLetters.push(letter);
  const button = document.getElementById(`letter-${letter}`);
  if (button) {
    button.disabled = true;
    button.classList.add("button__disabled");
  }
  if (currentQuestion.answer.toUpperCase().includes(letter)) {
    currentQuestion.answer.split("").forEach((char, index) => {
      if (char.toUpperCase() === letter) {
        answerCurrent[index] = char;
      }
    });
  } else {
    wrongAttempts++;
    drawHangmanPart();
  }
  updateGame();
}

function updateGame() {
  document.querySelector(".word").textContent = answerCurrent.join(" ");
  if (wrongAttempts === maxAttempts) {
    endGame(false);
  } else if (!answerCurrent.includes("_")) {
    endGame(true);
  }
}

function endGame(win) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.style.display = "flex";

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");

  const message = document.createElement("p");
  message.textContent = win ? "Красава" : "Nt бро";

  const answerReveal = document.createElement("p");
  answerReveal.textContent = `Ответ: ${currentQuestion.answer}`;

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Играть снова";
  playAgainButton.addEventListener("click", initGame);

  modalContent.appendChild(message);
  modalContent.appendChild(answerReveal);
  modalContent.appendChild(playAgainButton);
  modal.appendChild(modalContent);
  body.appendChild(modal);
}

function drawGallows() {
  ctx.beginPath();
  ctx.moveTo(10, 350);
  ctx.lineTo(150, 350);
  ctx.moveTo(80, 350);
  ctx.lineTo(80, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(150, 100);
  ctx.stroke();
}

function drawHead() {
  ctx.beginPath();
  ctx.arc(150, 130, 30, 0, Math.PI * 2, true);
  ctx.stroke();
}

function drawBody() {
  ctx.beginPath();
  ctx.moveTo(150, 160);
  ctx.lineTo(150, 250);
  ctx.stroke();
}

function drawLeftArm() {
  ctx.beginPath();
  ctx.moveTo(150, 180);
  ctx.lineTo(120, 220);
  ctx.stroke();
}

function drawRightArm() {
  ctx.beginPath();
  ctx.moveTo(150, 180);
  ctx.lineTo(180, 220);
  ctx.stroke();
}

function drawLeftLeg() {
  ctx.beginPath();
  ctx.moveTo(150, 250);
  ctx.lineTo(120, 300);
  ctx.stroke();
}

function drawRightLeg() {
  ctx.beginPath();
  ctx.moveTo(150, 250);
  ctx.lineTo(180, 300);
  ctx.stroke();
}

function drawHangmanPart() {
  if (wrongAttempts <= hangmanParts.length) {
    hangmanParts[wrongAttempts - 1]();
  }
}

initGame();
