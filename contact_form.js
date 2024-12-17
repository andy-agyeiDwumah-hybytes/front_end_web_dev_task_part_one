const myForm = document.getElementById("my-form");
myForm.addEventListener("submit", e => {
    e.preventDefault();
    // Get form data
    const form = new FormData(myForm);

    for (let value of form) {
      console.log(`${value[0]}: ${value[1]}`);
    }
    
    alert("Form successfully submitted! Check the console");
    // Clear user input
    myForm.reset()
})

const userEmail = document.getElementById("email");
const userName = document.getElementById("name");
const userMessage = document.getElementById("message");

// Runs code everytime the value inside the input is changed
userEmail.addEventListener("input", () => {
  // Check if email matches the pattern for a well-formed email address
  if (userEmail.validity.typeMismatch) {
    userEmail.setCustomValidity(
      "Please enter a valid email before submitting the form"
    );
  } else {
    // Empty string renders the input valid and the form will submit
    userEmail.setCustomValidity("");
  }
});

userName.addEventListener("input", () => {
  if (userName.validity.valueMissing) {
    userName.setCustomValidity(
      "Please enter a name before submitting the form"
    );
  } else {
    userName.setCustomValidity("");
  }
});

userMessage.addEventListener("input", () => {
  if (userMessage.validity.valueMissing) {
    userMessage.setCustomValidity(
      "Please enter a message before submitting the form"
    );
  } else {
    userMessage.setCustomValidity("");
  }
});