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
const alphabet = document.querySelector(".alphabet");
const gameWon = document.querySelector(".gameWon");
let secretWord = "";
let guess = "";
let hiddenLetters;
let letters;
let allHiddenLetters;

let guessesMade = []; //97 -> 122
for (let i = 97; i <= 122; i++) {
  guessesMade.push(String.fromCharCode(i));
  let guessesMadeDisplay = document.createElement("li");
  guessesMadeDisplay.innerHTML = String.fromCharCode(i);
  guessesMadeDisplay.classList.add("guessesMadeDisplay");
  alphabet.appendChild(guessesMadeDisplay);
}

//Submit secretWord
submitButton.addEventListener("mousedown", submitSecretWordFunc);
function submitSecretWordFunc() {
  //Set the secretWord to the input value
  let toCheck = /[a-z]{3}/gi;
  if (!toCheck.test(wordInput.value) || wordInput.value.length > 13) {
    alert(
      `Your word must be a between 3 and 13 characters in length and only use letters`
    );
    wordInput.value = "";
  } else {
    secretWord += wordInput.value;
    //Create the array of individual letters
    hiddenLetters = [...secretWord];
    //Create the list elements to be displayed
    for (let i = 0; i < hiddenLetters.length; i++) {
      letters = document.createElement("li");
      letters.innerHTML = hiddenLetters[i];
      letters.classList.add("hiddenText");
      secretLettersDisplay.appendChild(letters);
    }
    removeSpacesUnderline();
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
  let toCheck = /[a-z]{1}/gi;
  if (!toCheck.test(guessInput.value)) {
    alert(`Your guess must be either 1 letter or the entire word`);
    guessInput.value = "";
  } else if (
    guessInput.value.length !== 1 &&
    guessInput.value.length !== hiddenLetters.length
  ) {
    alert(`Your guess must be either 1 letter or the entire word`);
    guessInput.value = "";
  } else {
    guess += guessInput.value;
    crossOffGuessedLetterFunc();
    guessChecker(guess);
    livesCountFunc();
  }
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
  revealCorrectLetterFunc();
  if (hiddenLetters.includes(guess)) {
    console.log(`Correct Guess`);
  } else if (guess === secretWord) {
    gameWinningFunc();
    console.log(`You got the word!`);
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

function revealCorrectLetterFunc() {
  const letterToChange = document.querySelectorAll("li");
  for (let letters of letterToChange) {
    if (letters.innerHTML === guess) {
      letters.classList.add("revealText");
    }
  }
}

function removeSpacesUnderline() {
  const letterToChange = document.querySelectorAll("li");
  for (let letters of letterToChange) {
    if (letters.innerHTML === " ") {
      letters.style.borderColor = "var(--hiddenText)";
    }
  }
}

function crossOffGuessedLetterFunc() {
  const guessesToCross = document.querySelectorAll(".guessesMadeDisplay");
  for (let letters of guessesToCross) {
    if (letters.innerHTML === guess) {
      letters.classList.add("lineThrough");
    }
  }
}
function gameWinningFunc() {
  gameWon.classList.remove("hidden");
}
