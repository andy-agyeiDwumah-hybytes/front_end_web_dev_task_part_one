const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementById("navigation-menu");

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

hamburger.addEventListener("click", mobileMenu);
// Allow user to interact with hamburger using enter key
hamburger.addEventListener("keydown", e => {
  if (e.code === "Enter" || e.code === "Space") {
    mobileMenu()
  }
})

// width must match breakpoint specified in the css
let bootStrapLargeBreakPoint = window.matchMedia("(min-width: 992px)");

// This will allow the menu to be closed even if the user didn't close it before
window.addEventListener("resize", () => {
  if (bootStrapLargeBreakPoint.matches) {
    if (hamburger.classList.contains("active") && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
})