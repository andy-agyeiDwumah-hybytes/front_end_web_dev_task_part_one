const myForm = document.getElementById("my-form");
const greetingContainer = document.getElementById("greeting-container");
let speed = 90;  // type writer speed
let i = 0;
let greeting;

const typeWriter = () => {
    let h1 = document.querySelector("h1");
    if (i < greeting.length) {
      h1.innerHTML += greeting.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
}

const createHeadingForUserName = () => {
    let heading = document.createElement("h1");
    greetingContainer.appendChild(heading);
}

myForm.addEventListener("submit", e => {
    e.preventDefault();

    const form = new FormData(myForm);
    const userName = form.get("user_name").trim();
    // Check if no input was given
    if (userName === "") return;

    greeting = `Hello, ${userName}.`;

    // Check if a user has already entered a name
    let children = greetingContainer.children ? greetingContainer.children[0] : false;

    // If they have, remove the name
    if (children) {
        greetingContainer.removeChild(children);
    }

    createHeadingForUserName();

    // Reset i if user has already entered a name
    if (i != 0) {
        i = 0;
    }

    typeWriter(greeting);
    myForm.reset();
})