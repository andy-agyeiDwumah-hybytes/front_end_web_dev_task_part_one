const container = document.getElementById("container");

const generateRedColour = () => {
    return Math.floor(Math.random() * 256);
}

const generateGreenColour = () => {
    return Math.floor(Math.random() * 256);
}

const generateBlueColour = () => {
    return Math.floor(Math.random() * 256);
}

container.addEventListener("click", e => {
    if (e.target.matches("#container > div")) {
      e.target.style.backgroundColor = `rgba(${generateRedColour()} ${generateGreenColour()} ${generateBlueColour()} / 1)`;
    }
})