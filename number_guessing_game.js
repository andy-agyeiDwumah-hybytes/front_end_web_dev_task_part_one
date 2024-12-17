let randomNumber;
let numOfGuesses = 0;
const feedback = ["Too high", "Too low", "Correct"];

const numOfGuessesSpan = document.getElementById("num-of-guesses");
numOfGuessesSpan.innerHTML = numOfGuesses;

const feedbackText = document.getElementById("feedback");
const myForm = document.getElementById("my-form");

const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");

// Generate random number
const generateRandomNumBetweenOneAndHundred = (min=1, max=100) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Restart the game
restartButton.addEventListener("click", () => {
    const newNumber = generateRandomNumBetweenOneAndHundred();
    randomNumber = newNumber;
    numOfGuesses = 0;
    numOfGuessesSpan.innerHTML = 0;
    submitButton.removeAttribute("disabled");
    restartButton.innerHTML = "Reset";
    feedbackText.innerHTML = "";
    console.log("New random number", randomNumber);
})

// Check if user number matches the random number
const checkUserNumberIsCorrect = userNumber => {
    if (userNumber === randomNumber) {
        feedbackText.innerHTML = feedback[2];
        numOfGuessesSpan.innerHTML = ++numOfGuesses;
        submitButton.setAttribute("disabled", null);
        restartButton.innerHTML = "Play again?";
    } else if (userNumber > randomNumber) {
        feedbackText.innerHTML = feedback[0];
        numOfGuessesSpan.innerHTML = ++numOfGuesses;
    } else {
        feedbackText.innerHTML = feedback[1];
        numOfGuessesSpan.innerHTML = ++numOfGuesses;
    }
}

// Generate random number
let result = generateRandomNumBetweenOneAndHundred();
randomNumber = result;
console.log("Random number is:", randomNumber);

// Get user number
myForm.addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData(myForm);
    // Convert to number
    const guess = +form.get("user_number");

    checkUserNumberIsCorrect(guess);
})