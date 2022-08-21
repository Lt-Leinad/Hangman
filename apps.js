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
const wordContainer = document.querySelector(".word-container");
const guessContainer = document.querySelector(".guess-container");
const newGame = document.querySelector(".newGame");
const postGameNewGameButton = document.querySelector(".postGameNewGameButton");

//inititation
let secretWord = "";
let guess = "";
let hiddenLetters;
let letters;
let sum = 0;
let alreadyGuessedLetters = [];
//for the list of guesses
let guessesMade = []; //97 -> 122
for (let i = 65; i <= 90; i++) {
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
  let toCheck = /[^a-z\s]/gi;
  if (
    toCheck.test(wordInput.value) ||
    wordInput.value.length > 13 ||
    wordInput.value.length < 3
  ) {
    alert(
      `Your word must be a between 3 and 13 characters in length and only use letters`
    );
    wordInput.value = "";
  } else {
    secretWord += wordInput.value.toUpperCase().trim();
    //Create the array of individual letters
    hiddenLetters = [...secretWord];
    //Create the list elements to be displayed
    for (let i = 0; i < hiddenLetters.length; i++) {
      letters = document.createElement("li");
      letters.innerHTML = hiddenLetters[i];
      letters.classList.add("hiddenText");
      letters.classList.add("secretLetter");
      secretLettersDisplay.appendChild(letters);
    }
    removeSpacesUnderline();
    addSpaces();
  }
}
//Clear the secret word wordInput
submitButton.addEventListener("mouseup", clearSubmitInput);
function clearSubmitInput() {
  wordInput.value = "";
  console.log(`
    Your secretWord is ${secretWord}
    Your hiddenLetters are ${hiddenLetters}
    `);
  wordContainer.classList.add("hidden");
  guessContainer.classList.remove("hidden");
}
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
    guess += guessInput.value.toUpperCase();
    checkItHasNotBeenGuessed();
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
  console.log(`hiddenLetters length = ${hiddenLetters.length}
    sum = ${sum}`);
  if (sum == hiddenLetters.length) {
    gameWinningFunc();
  } else if (guess === secretWord) {
    gameWinningFunc();
    //Display all the letters -----------------CHANGE
    const letterToChange = document.querySelectorAll(".secretLetter");
    for (let letters of letterToChange) {
      letters.classList.add("revealText");
    }
    console.log(`You got the word!`);
  } else if (!hiddenLetters.includes(guess)) {
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
    //GAME OVER FUNCTION---------------------------------------
    head.classList.add("redHead");
    gameOver.classList.remove("hidden");
    guessContainer.classList.add("hidden");
    postGameNewGameButton.classList.remove("hidden");
    if (secretWord) {
      document.removeEventListener("keyup", enterUp);
      document.removeEventListener("keydown", enterDown);
      const letterToChange = document.querySelectorAll(".secretLetter");
      for (let letters of letterToChange) {
        letters.classList.add("revealText");
      }
    }
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
  const letterToChange = document.querySelectorAll(".secretLetter");
  for (let letters of letterToChange) {
    if (letters.innerHTML === guess) {
      letters.classList.add("revealText");
      sum++;
      console.log(`sum = ${sum}`);
    }
  }
}

function removeSpacesUnderline() {
  const letterToChange = document.querySelectorAll("li");
  for (let letters of letterToChange) {
    if (letters.innerHTML === " ") {
      letters.style.borderColor = "transparent";
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
  guessContainer.classList.add("hidden");
  postGameNewGameButton.classList.remove("hidden");
  document.removeEventListener("keyup", enterUp);
  document.removeEventListener("keydown", enterDown);
}

function checkItHasNotBeenGuessed() {
  if (alreadyGuessedLetters.includes(guess)) {
    alert(`You have already guessed this letter`);
    guess = "";
    guessInput.value = "";
  } else {
    crossOffGuessedLetterFunc();
    guessChecker(guess);
    livesCountFunc();
    alreadyGuessedLetters.push(guess);
    console.log(alreadyGuessedLetters);
    console.log(guess);
  }
}

newGame.addEventListener("click", initiate);

function initiate() {
  postGameNewGameButton.classList.add("hidden");
  wordContainer.classList.remove("hidden");
  guessContainer.classList.add("hidden");
  gameOver.classList.add("hidden");
  gameWon.classList.add("hidden");
  for (let i = 0; i < hiddenLetters.length; i++) {
    removeAllChildNodes(secretLettersDisplay);
  }
  secretWord = "";
  wordInput.value = "";
  guessInput.value = "";
  guess = "";
  hiddenLetters = [];
  alreadyGuessedLetters = [];
  incorrectGuessCount = 13;
  livesCountFunc();
  sum = 0;
  const guessesToCross = document.querySelectorAll(".guessesMadeDisplay");
  for (let letters of guessesToCross) {
    letters.classList.remove("lineThrough");
  }
  removingTheGallows();
  document.addEventListener("keyup", enterUp);
  document.addEventListener("keydown", enterDown);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function removingTheGallows() {
  head.classList.remove("redHead");
  gameOver.classList.add("hidden");
  rightLeg.classList.add("hidden");
  leftLeg.classList.add("hidden");
  rightArm.classList.add("hidden");
  leftArm.classList.add("hidden");
  body.classList.add("hidden");
  head.classList.add("hide");
  danglePost.classList.add("hidden");
  topCornerPost.classList.add("hidden");
  topPost.classList.add("hidden");
  bottomCornerPost.classList.add("hidden");
  leftPost.classList.add("hidden");
  bottomPost.classList.add("hidden");
  guessInput.classList.remove("hidden");
  guessButton.classList.remove("hidden");
}

document.addEventListener("keydown", enterDown);
function enterDown(e) {
  if (e.key === `Enter`) {
    if (wordContainer.classList.contains("hidden")) {
      guessFunc();
    } else if (guessContainer.classList.contains("hidden")) {
      submitSecretWordFunc();
    }
  }
}

document.addEventListener("keyup", enterUp);
function enterUp(e) {
  if (e.key === `Enter`) {
    if (wordContainer.classList.contains("hidden")) {
      clearGuessInput();
    } else if (guessContainer.classList.contains("hidden")) {
      clearSubmitInput();
    }
  }
}

function addSpaces() {
  const spacesArr = [];
  if (hiddenLetters.includes(" ")) {
    for (let spaces of hiddenLetters) {
      if (spaces === " ") {
        spacesArr.push(spaces);
        sum += spacesArr.length;
      }
    }
  }
}

postGameNewGameButton.addEventListener("click", initiate);
