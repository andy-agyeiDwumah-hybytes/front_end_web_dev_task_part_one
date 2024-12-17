const calcAreaOfRectangle = (width, height) => width * height;

const myForm = document.getElementById("my-form");

myForm.addEventListener("submit", e => {
    e.preventDefault();

    const span = document.getElementById("answer-span");
    const answerContianer = document.querySelector("div.answer-container");

    const form = new FormData(myForm);
    const width = form.get("width");
    const height = form.get("height");

    const result = calcAreaOfRectangle(width, height);

    answerContianer.style.display = "block";
    span.textContent = result;
})