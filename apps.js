const leftPost = document.querySelector(".leftPost");
const topPost = document.querySelector(".topPost");
const bottomPost = document.querySelector(".bottomPost");
const danglePost = document.querySelector(".danglePost");
const topCornerPost = document.querySelector(".topCornerPost");
const bottomCornerPost = document.querySelector(".bottomCornerPost");
const head = document.querySelector(".head");
const body = document.querySelector(".body");
const leftArm = document.querySelector(".leftArm");
const rightArm = document.querySelector(".rightArm");
const leftLeg = document.querySelector(".leftLeg");
const rightLeg = document.querySelector(".rightLeg");
const wordInput = document.querySelector(".wordInput");
const submitButton = document.querySelector(".submitButton");
const guessButton = document.querySelector(".guessButton");
const guessInput = document.querySelector(".guessInput");
const secretLettersDisplay = document.querySelector(".secretLettersDisplay");
const lives = document.querySelector(".lives");
const gameOver = document.querySelector(".gameOver");
let secretWord = "";
let guess = "";
let hiddenLetters;
let letters;
let allHiddenLetters;

//Submit secretWord
submitButton.addEventListener("mousedown", submitSecretWordFunc);
function submitSecretWordFunc() {
  //Set the secretWord to the input value
  secretWord += wordInput.value;
  //Create the array of individual letters
  hiddenLetters = [...secretWord];
  //Create the list elements to be displayed
  for (let i = 0; i < hiddenLetters.length; i++) {
    letters = document.createElement("li");
    letters.innerHTML = hiddenLetters[i];
    letters.classList.add(this.textContent);
    letters.classList.add("hiddenText");
    secretLettersDisplay.appendChild(letters);
  }
}
//Clear wordInput
submitButton.addEventListener("mouseup", function () {
  wordInput.value = "";
  console.log(`
  Your secretWord is ${secretWord}
  Your hiddenLetters are ${hiddenLetters}
  `);
  submitButton.classList.add("hidden");
  wordInput.classList.add("hidden");
  guessButton.classList.remove("hidden");
  guessInput.classList.remove("hidden");
});
//Guess Function
let incorrectGuessCount = 13;
lives.innerHTML = `${incorrectGuessCount} Hours Left`;
guessButton.addEventListener("mousedown", guessFunc);
function guessFunc() {
  guess += guessInput.value;
  guessChecker(guess);
  livesCountFunc();
}

//Clear the input
function clearGuessInput() {
  guessInput.value = "";
  console.log(`Your Guess is ${guess}`);
  guess = "";
}
guessButton.addEventListener("mouseup", clearGuessInput);
//Check if the guess was correct
function guessChecker(guess) {
  if (hiddenLetters.includes(guess)) {
    console.log(`Correct Guess`);
    revealCorrectLetterFunc();
  } else {
    incorrectGuessCount--;
    buildingTheGallows[incorrectGuessCount]();
    console.log(`
    Incorrect Guess
    Lives Left: ${incorrectGuessCount}
    `);
  }
}
//building the gallows
const buildingTheGallows = {
  0: function () {
    head.classList.add("redHead");
    gameOver.classList.remove("hidden");
  },
  1: function () {
    rightLeg.classList.remove("hidden");
  },
  2: function () {
    leftLeg.classList.remove("hidden");
  },
  3: function () {
    rightArm.classList.remove("hidden");
  },
  4: function () {
    leftArm.classList.remove("hidden");
  },
  5: function () {
    body.classList.remove("hidden");
  },
  6: function () {
    head.classList.remove("hide");
  },
  7: function () {
    danglePost.classList.remove("hidden");
  },
  8: function () {
    topCornerPost.classList.remove("hidden");
  },
  9: function () {
    topPost.classList.remove("hidden");
  },
  10: function () {
    bottomCornerPost.classList.remove("hidden");
  },
  11: function () {
    leftPost.classList.remove("hidden");
  },
  12: function () {
    bottomPost.classList.remove("hidden");
  },
};

function livesCountFunc() {
  lives.innerHTML = `${incorrectGuessCount} Hours Left`;
  console.log(incorrectGuessCount);
}

const alphabet = document.createElement("li");

function revealCorrectLetterFunc() {
  const letterToChange = document.querySelectorAll("li");
  for (let letters of letterToChange) {
    if (letters.innerHTML === guess) {
      letters.classList.add("revealText");
    }
  }
}
