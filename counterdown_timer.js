let timer;
let time;
let colourTimer;
let colourPointer = 0;
// Must match animiation duration in CSS
let animationDuration = 2000;

const myForm = document.getElementById("my-form");
const timeUpDiv = document.getElementById("time-up-div");
const timeUpText = document.getElementById("time-up-text");
const timeRemainingDiv = document.getElementById("time-remaining-div");
const timeRemainingText = document.getElementById("time-remaining-text");
const resetButton = document.getElementById("reset");
const submitButton = document.getElementById("submit");
const body = document.getElementsByTagName("body")[0];
const heading = document.getElementsByTagName("h1")[0];
const requiredInfoText = document.getElementById("required-info");
const labelText = document.getElementsByTagName("label")[0];
const input = document.getElementById("number");

const timeRemainingPara = "Time remaining: ";

// Make sure these colours match too in the css
const black = "#333333";
const white = "#F7F7F7";
const backgroundColorsArr = [black, white];
const textColoursArr = [white, black];
const coloursArr = [
    backgroundColorsArr,
    textColoursArr
]

resetButton.addEventListener("click", () => {
    timeUpDiv.style.display = "none";
    timeRemainingDiv.style.display = "none";
    submitButton.removeAttribute("disabled");
    input.removeAttribute("disabled");
    // Remove all timers
    clearInterval(colourTimer);
    clearInterval(timer);
    // Reset colours
    body.style.backgroundColor = white;
    heading.style.color = black;
    requiredInfoText.style.color = black;
    labelText.style.color = black;
})

const changeColours = () => {
    // Restart cycle if true
    if (colourPointer === coloursArr.length) {
        colourPointer = 0;
    }
    // Cycle through coloursArr and changes background or text, to fit background or text
    body.style.backgroundColor = coloursArr[0][colourPointer];
    timeRemainingText.style.color = coloursArr[1][colourPointer];
    timeUpText.style.color = coloursArr[1][colourPointer];
    heading.style.color = coloursArr[1][colourPointer];
    requiredInfoText.style.color = coloursArr[1][colourPointer];
    labelText.style.color = coloursArr[1][colourPointer];
    colourPointer++;
}

const countdown = () => {
    timeRemainingText.textContent = `${timeRemainingPara} ${time}`;
    if (time === 0) {
        clearInterval(timer);
        timeUpDiv.style.display = "block";
        colourTimer = setInterval(changeColours, animationDuration);
    }
    time--;
}

const startTimer = userNumber => {
    // Show time remaining
    timeRemainingDiv.style.display = "block";
    // Prevent users from calling setInterval again
    input.setAttribute("disabled", null);
    submitButton.setAttribute("disabled", null);
    time = userNumber;
    timer = setInterval(countdown, 1000);
};

myForm.addEventListener("submit", e => {
    e.preventDefault();
    // Get user input from form and convert to number
    let formData = new FormData(myForm);
    let userNumber = +formData.get("user_number");
    startTimer(userNumber);
})