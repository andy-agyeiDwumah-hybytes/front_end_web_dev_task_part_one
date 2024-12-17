const numberOfFaqItems = 7;

const faqContainer = document.getElementById("faq-container");

const faqInfo = [
  {
    question: "What is JavaScript?",
    answer:
      "JavaScript is a high-level, interpreted programming language primarily used to create interactive " +
      "effects within web browsers. It allows you to add dynamic content to websites, such as animations, " +
      "form validation, and interactivity with users. JavaScript runs in the browser, making it essential " +
      "for front-end web development.",
  },
  {
    question: "What is the difference between JavaScript and Java?",
    answer:
      "Despite the similar names, Java and JavaScript are two entirely different languages. Java is a " +
      "general-purpose, object-oriented programming language used for creating standalone applications, " +
      "whereas JavaScript is a scripting language that runs primarily in the web browser to manipulate HTML, " +
      "CSS, and control browser behavior. JavaScript is lighter, more web-oriented, and more widely used in " +
      "front-end development.",
  },
  {
    question: "What are the data types in JavaScript?",
    answer:
      "JavaScript has several built-in data types, including:" +
      "<br><ul><li>Primitive Types: Number, String, Boolean</li>" +
      "<br><li>Reference types: Object, Array, Function</li></ul>",
  },
  {
    question: "What is the difference between let, const, and var?",
    answer:
      "<ul><li><code>var</code> - Declares a variable with function-scoped or globally scoped, and it can be " +
      "re-assigned and redeclared.</li>" +
      "<br><li><code>let</code> - Declares a block-scoped variable that " +
      "can be re-assigned but cannot be redeclared in the same scope.</li>" +
      "<br><li><code>const</code> - Declares a block-scoped variable that cannot be re-assigned after " +
      "initialization (i.e., a constant). Note: <code>const</code> only ensures that the variable " +
      "cannot be reassigned, but the contents of objects or arrays declared as const " +
      "can still be modified.</li></ul>",
  },
  {
    question: "What is a JavaScript function?",
    answer:
      "A JavaScript function is a block of reusable code that performs a specific task. Functions " +
      "are defined using the function keyword followed by a name, parameters, and a body. Once defined, " +
      "a function can be called multiple times in different parts of a program.",
  },
  {
    question: "What is a callback function in JavaScript?",
    answer:
      "A callback function is a function that is passed as an argument to another function and is " +
      "executed after that function completes. Callbacks are commonly used for asynchronous operations, " +
      "such as reading files, making network requests, or handling user interactions.",
  },
  {
    question: "What is the purpose of the this keyword in JavaScript?",
    answer:
      "The <code>this</code> keyword in JavaScript refers to the object that is currently executing the code. " +
      "Its value depends on how the function is called. For example: " +
      "<br><ul><li>In a global context, this refers to the global object (in browsers, it refers to window).</li>" +
      "<br><li>Inside an object method, this refers to the object the method is called on.</li>" +
      "<br><li>In an event handler, this refers to the element that triggered the event.</li>" +
      "<br><li>In arrow functions, this is lexically bound, meaning it retains the value of this from</li>" +
      "the surrounding non-arrow function.</ul>",
  },
];

// Update DOM with FAQ items
for (let i = 0; i < numberOfFaqItems; i++) {
    let details = document.createElement("details");
    let summary = document.createElement("summary");
    let paragraph = document.createElement("p");
    let div = document.createElement("div");

    summary.innerHTML = faqInfo[i]["question"];
    paragraph.innerHTML = faqInfo[i]["answer"];

    div.className = "question-answer-container";
    summary.className = "question";
    paragraph.className = "answer";

    details.appendChild(summary);
    details.appendChild(paragraph);
    div.appendChild(details);
    faqContainer.appendChild(div);
}

const search = document.getElementById("search");
const noMatchMessage = document.getElementById("no-match-container");

const showOrHideNoMatchMessage = hasMatch => {
  if (!hasMatch) {
    noMatchMessage.style.display = "block"; // Show the message
  } else {
    noMatchMessage.style.display = "none"; // Hide the message
  }
}

const removeAllMarkTagsFromQuestion = question => {
  question.innerHTML = question.innerHTML.replace(/<\/*mark>/gi, "");
}

const hideQuestion = item => {
  // Hide question if user search value is not in it
  item.style.display = "none";
}

const showQuestion = item => {
  // restore the element to its original display property
  item.style.display = "";
}

const manageMarkTags = (question, questionText, searchValue) => {
  // Remove mark tags, if any
  question.innerHTML = question.innerHTML.replace(/<\/*mark>/gi, "");

  // Add new mark tags from updated search value
  let highlightedText = questionText.replace(
    new RegExp(searchValue, "gi"),
    match => `<mark>${match}</mark>`
  );
  question.innerHTML = highlightedText; // Update innerHTML
}

const filterFaq = () => {
  let searchValue = search.value.toLowerCase();
  // Targets all divs - these contain the details, summary, and paragraph tags
  let faqItems = document.querySelectorAll(".question-answer-container");
  // Flag to track if any matches are found (i.e., if user search value in question)
  let hasMatch = false;

  // Loop through all divs
  faqItems.forEach(item => {
    let question = item.querySelector(".question"); // Get question
    let questionText = question.innerText;
    // Check if question includes user search value
    if (questionText.toLowerCase().includes(searchValue)) {
      hasMatch = true; // At least one match found
      // Show question if hidden before
      showQuestion(item);

      if (searchValue !== "") {
        // Check if search is not empty
        manageMarkTags(question, questionText, searchValue);
      }
    } else {
      hideQuestion(item);
    }
    if (searchValue === "") {
      removeAllMarkTagsFromQuestion(question);
    }
  });
  showOrHideNoMatchMessage(hasMatch);
}

search.addEventListener("keyup", filterFaq);