const button = document.getElementById("my-btn");
const body = document.getElementsByTagName("body")[0];

let counter = 0;
let span;

const coloursArr = [
  "#114B5F",
  "#E4FDE1",
  "#F45B69",
  "#456990",
  "#6B2737",
  "#B0C7BD",
  "#B8EBD0",
  "#8380B6",
  "#F45B69",
  "#111D4A",
  "#B0BEC5",
  "#007BFF",
];

button.addEventListener("click", () => {
    if (counter === coloursArr.length) {
        counter = 0;
    }
    body.style.backgroundColor = coloursArr[counter];
    span.innerHTML = `${counter+1} / ${coloursArr.length}`;
    counter++;
})

// Check if there are colours to cycle
if (coloursArr.length < 2) {
    button.innerHTML = "No colours to cycle";
    button.setAttribute("disabled", null);
} else {
    body.style.backgroundColor = coloursArr[0];
    // Increase counter here
    // So that next click will show next colour
    counter++;
    span = document.createElement("span");
    span.innerHTML = `${counter} / ${coloursArr.length}`;
    button.innerHTML = "Next Colour";

    button.appendChild(span);
}