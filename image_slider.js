const images = [
    {
        src: "the_woman_king.jpg",
        alt: "the woman king"
    },
    {
        src: "the_terminator.jpg",
        alt: "the terminator"
    },
    {
        src: "the_matrix.jpg",
        alt: "the matrix"
    },
    {
        src: "john_wick.jpg",
        alt: "john wick"
    },
    {
        src: "american_sniper.jpg",
        alt: "american sniper"
    },
    {
        src: "good_luck_to_you_leo_grande.jpg",
        alt: "good luck to you leo grande"
    },
    {
        src: "hancock.jpg",
        alt: "hancock"
    },
]

const sliderContainer = document.getElementById("slider-container");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const startPauseBtn = document.getElementById("start-pause-btn");

let currentIndex = 0;
let interval;

const createImages = () => {
    for (let i = 0; i < images.length; i++) {
        let img = document.createElement("img");
        img.setAttribute("src", images[i]["src"]);
        img.setAttribute("alt", images[i]["alt"]);

        if (i === 0) {
            // Add active class for first image
            img.classList.add("active");
        }
        sliderContainer.appendChild(img);
    }
}

const checkTextOfStartPauseBtn = () => {
    if (startPauseBtn.innerText === "Pause") {
        startPauseBtn.innerText = "Start";
    } else {
        return;
    }
}

const updateImage = () => {
    // Remove active class and add to current image
    let image = document.querySelector("img.active");
    image.classList.remove("active")

    let currentImg = document.getElementsByTagName("img")[currentIndex];
    currentImg.classList.add("active");
}

previousBtn.addEventListener("click", () => {
    // Get previous image
    clearInterval(interval);  // Stop automatic transition

    checkTextOfStartPauseBtn();

    currentIndex--;
    if (currentIndex < 0 ) {
        currentIndex = images.length - 1;
        updateImage();
    } else {
        updateImage();
    }
})

nextBtn.addEventListener("click", () => {
    // Get next image
    checkTextOfStartPauseBtn(); 

    clearInterval(interval); // Stop automatic transition
    currentIndex++;
    if (currentIndex === images.length) {
        currentIndex = 0;
        updateImage();
    } else {
        updateImage();
    }
})

const disableButtons = () => {
    nextBtn.disabled = true;
    previousBtn.disabled = true;
    startPauseBtn.disabled = true;
}

const createOneImage = () => {
    let image = document.createElement("img");
    image.setAttribute("src", images[currentIndex]["src"]);
    image.setAttribute("alt", images[currentIndex]["alt"]);
    image.classList.add("active");

    sliderContainer.appendChild(image);
}

const playSlider = () => {
    // Start automatic transition of images
    interval = setInterval(() => {
        currentIndex++;
        if (currentIndex === images.length) {
            currentIndex = 0;
            updateImage();
        } else {
            updateImage();
        }
    }, 2000)
}

const stopOrPlayImageSlider = () => {
    if (startPauseBtn.innerText === "Pause") {
        clearInterval(interval);
        startPauseBtn.innerText = "Start";
    } else {
        startPauseBtn.innerText = "Pause";
        playSlider();
    }
}

startPauseBtn.addEventListener("click", stopOrPlayImageSlider);

const checkNumberOfImages = () => {
    // Do not start interval if there are no images
    if (!images.length) {
        disableButtons();
        return;
    }
    
    if (images.length === 1) {
        createOneImage();
        disableButtons();
        return;
    }
    createImages();
    playSlider();
}

checkNumberOfImages();