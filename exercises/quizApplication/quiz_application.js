const questionSet = [
  {
    question: "What does <code>typeof</code> operator return in JavaScript?",
    options: [
      "A function to check data types",
      "The data type of the operand",
      "A syntax error if used incorrectly",
      "A Boolean value",
      "The size of the variable",
    ],
    answer: 2,
  },
  {
    question:
      "Which method is used to add new elements to the end of an array in JavaScript?",
    options: [
      "push&#40;&#41;",
      "append&#40;&#41;",
      "add&#40;&#41;",
      "concat&#40;&#41;",
      "insert&#40;&#41;",
    ],
    answer: 1,
  },
  {
    question:
      "What will <code>console.log(2 + '2')</code> output in JavaScript?",
    options: ["4", "22", "NaN", "undefined", "Syntax Error"],
    answer: 2,
  },
  {
    question:
      "Which of the following is used to declare a variable in JavaScript?",
    options: ["define", "let", "variety", "set", "constant"],
    answer: 2,
  },
];

const endQuiz = e => {
  e.preventDefault();
  let userScore = getScoreOnSubmit();
  displayFinalScore(userScore);
};

const form = document.getElementById("form");
form.addEventListener("submit", endQuiz);

const getScoreOnSubmit = () => {
  const quizForm = new FormData(form);
  // get only the user scores from submitted quiz
  const userAnswers = Array.from(quizForm.values());
  let score = 0;

  for (let i = 0; i < questionSet.length; i++) {
    // Convert user answer into a number
    // Check if user answer is correct
    if (+userAnswers[i] === questionSet[i]["answer"]) {
      score++;
    }
  }
  return score;
};

const displayFinalScore = score => {
  const scoreContainer = document.createElement("div");
  scoreContainer.id = "scoreContainer";
  const scoreText = document.createElement("h2");
  scoreText.innerHTML = `Your score is: ${score} / ${questionSet.length}`;

  // Disable the submit button when quiz is submitted
  const submitBtn = document.querySelector("#submitBtnContainer > button");
  submitBtn.disabled = true;

  scoreContainer.appendChild(scoreText);
  main.appendChild(scoreContainer);
};

const main = document.getElementById("main");

const createSubmitButton = () => {
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  const submitButtonContainer = document.createElement("div");
  submitButtonContainer.setAttribute("id", "submitBtnContainer");
  submitButtonContainer.appendChild(submitBtn);

  return submitButtonContainer;
};

const goToPreviousQuestion = () => {
  const currentElement = document.querySelector("fieldset.active");
  const nextBtn = document.querySelector("button.nextBtn");
  const previousElement = currentElement.previousElementSibling;
  const firstElement = document.querySelector("div.form-container").firstChild;
  //   This will allow the user to go back to last question if they have just come from there
  if (nextBtn.disabled) {
    nextBtn.disabled = false;
  }
  if (previousElement === firstElement) {
    const prevBtn = document.querySelector("button.prevBtn");
    prevBtn.setAttribute("disabled", true);
  }

  currentElement.classList.remove("active");
  previousElement.classList.add("active");
};

const goToNextQuestion = () => {
  const currentElement = document.querySelector("fieldset.active");
  const prevBtn = document.querySelector("button.prevBtn");
  const nextElement = currentElement.nextElementSibling;
  const lastElement = document.querySelector("div.form-container").lastChild;
  // This will allow the user to go back to first question if they have just come from there
  if (prevBtn.disabled) {
    prevBtn.disabled = false;
  }
  // If user is on the last question, disable the 'next' button
  if (nextElement === lastElement) {
    const nextBtn = document.querySelector("button.nextBtn");
    nextBtn.setAttribute("disabled", true);
  }
  currentElement.classList.remove("active");
  nextElement.classList.add("active");
};

const createRadioButtons = (question, index, fieldset) => {
  for (let i = 0; i < question["options"].length; i++) {
    const currentAnswer = question["options"][i];
    const id = `question_${index + 1}_answer_${i + 1}`;

    const input = document.createElement("input");

    input.setAttribute("type", "radio");
    input.setAttribute("id", id);
    input.setAttribute("value", i + 1);
    input.setAttribute("name", `question_${index + 1}`);

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerHTML = currentAnswer;

    const div = document.createElement("div");

    div.appendChild(input);
    div.appendChild(label);
    fieldset.appendChild(div);
  }
};

const createQuestions = (formContainer, index, question) => {
  const fieldset = document.createElement("fieldset");

  if (index === 0) {
    // Show first question when document is loaded
    fieldset.classList.add("active");
  }

  const legend = document.createElement("legend");

  legend.innerHTML = question["question"];
  fieldset.appendChild(legend);

  createRadioButtons(question, index, fieldset);

  if (index === questionSet.length - 1) {
    // Create submit button for the last fieldset to submit quiz
    const submitBtnContainer = createSubmitButton();
    fieldset.appendChild(submitBtnContainer);
  }

  formContainer.appendChild(fieldset);
  form.appendChild(formContainer);
};

const createPrevNextButtons = () => {
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "Previous";
    prevBtn.classList.add("prevBtn");
    prevBtn.addEventListener("click", goToPreviousQuestion);
    // As this is question 1, prevent user from going backwards
    prevBtn.setAttribute("disabled", true);

    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "Next";
    nextBtn.classList.add("nextBtn");
    nextBtn.addEventListener("click", goToNextQuestion);

    return [prevBtn, nextBtn];
};

const updateUI = () => {
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  
  const [prevBtn, nextBtn] = createPrevNextButtons();

  questionSet.forEach((question, index) => {
    createQuestions(formContainer, index, question);
  });
  buttonContainer.appendChild(prevBtn);
  buttonContainer.appendChild(nextBtn);
  main.appendChild(buttonContainer);
};

updateUI();
