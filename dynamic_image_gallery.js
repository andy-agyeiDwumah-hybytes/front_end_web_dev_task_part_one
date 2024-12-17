const gridContainer = document.getElementById("grid-container");
let textContainers;

const movieData = [
  {
    src: "miracle_in_cell_number_7.jpg",
    alt: "Miracle in cell number 7",
    description: "A story about the love between a mentally-ill \
    father and his lovingly adorable daughter."
  },
  {
    src: "the_matrix.jpg",
    alt: "The Matrix",
    description: "When a beautiful stranger leads computer hacker Neo to a \
    forbidding underworld, \
    he discovers the shocking truth--the life he knows is the elaborate \
    deception of an evil cyber- intelligence."
  },
  {
    src: "book_of_eli.jpg",
    alt: "Book of eli",
    description: "A drifter fights his way across a ravaged, post-apocalyptic \
    America while protecting a sacred book that holds the secrets to humanity's \
    salvation."
  },
  {
    src: "hancock.jpg",
    alt: "Hancock",
    description: "Hancock is a superhero whose ill-considered behavior regularly \
    causes damage in the millions. He changes when the person he saves helps him \
    improve his public image."
  },
  {
    src: "good_luck_to_you_leo_grande.jpg",
    alt: "Good luck to you Leo Grande",
    description: "Nancy Stokes, a retired school teacher, is yearning for some \
    adventure, and some sex. And she has a plan, which involves hiring a young sex \
    worker named Leo Grande."
  },
  {
    src: "i_robot.jpg",
    alt: "I Robot",
    description: "In 2035, a technophobic cop investigates a crime that may have \
     been perpetrated by a robot, which leads to a larger threat to humanity."
  },
  {
    src: "inside_man.jpg",
    alt: "Inside Man",
    description: "A police detective, a bank robber, and a high-power broker enter \
    high-stakes negotiations after the criminal's brilliant heist spirals into a \
    hostage situation"
  },
  {
    src: "john_wick.jpg",
    alt: "John Wick",
    description: "John Wick is a former hitman grieving the loss of his true love. \
    When his home is broken into, robbed, and his dog killed, he is forced to return \
    to action to exact revenge."
  },
  {
    src: "kingsman.jpg",
    alt: "Kingsman",
    description: "A spy organisation recruits a promising street kid into the agency's \
    training program, while a global threat emerges from a twisted tech genius."
  },
  {
    src: "the_terminator.jpg",
    alt: "The Terminator",
    description: "A cyborg assassin from the future attempts to find and kill a young \
    woman who is destined to give birth to a warrior who will lead a resistance to save \
    humankind from extinction."
  },
  {
    src: "the_woman_king.jpg",
    alt: "The Woman King",
    description: "A historical epic inspired by true events that took place in The Kingdom \
    of Dahomey, one of the most powerful states of Africa in the 18th and 19th centuries."
  },
  {
    src: "american_sniper.jpg",
    alt: "American Sniper",
    description: "Navy S.E.A.L. sniper Chris Kyle's pinpoint accuracy saves countless lives \
    on the battlefield and turns him into a legend. Back home with his family after four \
    tours of duty, however, Chris finds that it is the war he can't leave behind."
  },
];

for (let i = 0; i < movieData.length; i++) {
    let outerContainer = document.createElement("div");
    let innerContainer = document.createElement("div");
    let imgDiv = document.createElement("div");
    let textContainer = document.createElement("div");
    let img = document.createElement("img");
    let para = document.createElement("p");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    
    outerContainer.className = "outer-container";
    
    textContainer.className = "text-container";
    innerContainer.className = "inner-container";

    img.setAttribute("src", movieData[i]["src"]);
    img.setAttribute("alt", movieData[i]["alt"]);
    
    h3.innerHTML = `Title: ${movieData[i]["alt"]}`;
    h4.innerHTML = "Description:";
    para.innerHTML = `${movieData[i]["description"]}`;

    imgDiv.appendChild(img);
    textContainer.appendChild(h3);
    textContainer.appendChild(h4);
    textContainer.appendChild(para);

    innerContainer.appendChild(imgDiv);
    
    outerContainer.appendChild(innerContainer);
    outerContainer.appendChild(textContainer);
    
    gridContainer.appendChild(outerContainer);
}

// Let users see description when main container is hovered on
  textContainers = document.querySelectorAll(".text-container");
  let outerContainer = document.querySelectorAll(".outer-container");

  // Show or hide height of text container
  for (let i = 0; i < textContainers.length; i++) {
    outerContainer[i].addEventListener("mouseenter", () => {
      textContainers[i].style.height = "100%";
      // For content that overflows box
      // textContainers[i].style.overflowY = "scroll";
      // textContainers[i].style.pointerEvents = "auto";
    });
    outerContainer[i].addEventListener("mouseleave", () => {
      textContainers[i].style.height = "0";
      // textContainers[i].style.pointerEvents = "none";
      // textContainers[i].style.overflowY = "hidden";
    });
  }