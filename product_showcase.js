const numOfGridColumns = 12;
const gridContainer = document.getElementById("grid-container");

const products = [
    {
        imgSrc: "images/games/assassin_creed_game.webp",
        description: "Assassin's Creed Mirage PS5 Game",
        price: "£28.99"
    },
    {
        imgSrc: "images/games/call_of_duty_game.webp",
        description: "Call of Duty: Black Ops Cold War PS5 Game",
        price: "£21.99",
    },
    {
        imgSrc: "images/games/dragon_ball_game.webp",
        description: "Dragon Ball Z: Kakorot PS5 Game",
        price: "£13.99",
    },
    {
        imgSrc: "images/games/fifa_game.webp",
        description: "EA Sports FC PS5 Game",
        price: "£54.99",
    },
    {
        imgSrc: "images/games/gran_turismo_game.webp",
        description: "Gran Turismo 7 PS5 Game",
        price: "£59.99",
    },
    {
        imgSrc: "images/games/gta_game.webp",
        description: "Grand Theft Auto 5 PS5 Game",
        price: "£19.99",
    },
    {
        imgSrc: "images/games/harry_potter_game.webp",
        description: "Lego Harry Potter Collection PS5 Game",
        price: "£25.99",
    },
    {
        imgSrc: "images/games/hitman_game.webp",
        description: "Hitman: World Of Assassination PS5 Game",
        price: "£27.99",
    },
    {
        imgSrc: "images/games/last_of_us_game.webp",
        description: "The Last Of Us Part II Remastered PS5 Game",
        price: "£37.99",
    },
    {
        imgSrc: "images/games/silent_hill_game.webp",
        description: "Silent Hill 2 PS5 Game",
        price: "£54.99",
    },
    {
        imgSrc: "images/games/spiderman_game.webp",
        description: "Marvel's Spider-Man 2 PS5 Game",
        price: "£58.99",
    },
    {
        imgSrc: "images/games/dragon_age_game.webp",
        description: "Dragon Age: The Veilguard PS5 Game",
        price: "£57.99",
    }
]

for (let i = 0; i < numOfGridColumns; i++) {
    let outerDiv = document.createElement("div");
    let imageDiv = document.createElement("div");
    let textDiv = document.createElement("div");
    let button = document.createElement("button");
    let productDescriptionText = document.createElement("p")
    let priceText = document.createElement("p");
    let image = document.createElement("img");

    productDescriptionText.innerHTML = products[i]["description"];
    priceText.innerHTML = `<strong>${products[i]["price"]}</strong>`;
    button.innerHTML = "View";

    image.setAttribute("src", products[i]["imgSrc"]);
    image.setAttribute("alt", products[i]["description"]);

    textDiv.className = "text-div";
    textDiv.appendChild(productDescriptionText);
    textDiv.appendChild(priceText);
    imageDiv.appendChild(image);

    outerDiv.appendChild(imageDiv);
    outerDiv.appendChild(textDiv);
    outerDiv.appendChild(button);

    gridContainer.appendChild(outerDiv);
}