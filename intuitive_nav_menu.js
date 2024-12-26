const hamburger = document.querySelector(".hamburger");
const nav = document.getElementById("main-nav");
const dropdownMenuContainer = document.querySelector(
  ".dropdown-menu-container"
);
const serviceLink = document.getElementById("service-link");

function toggleNavHeight() {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
}

hamburger.addEventListener("click", toggleNavHeight);
// Allow user to interact with hamburger using enter key
hamburger.addEventListener("keydown", (e) => {
  if (e.code !== "Enter") return;
  toggleNavHeight();
});

// Allow for keyboard accessibility when showing 'service' links
function toggleDropDownMenuContainer() {
  if (dropdownMenuContainer.style.display === "block") {
    dropdownMenuContainer.style.display = "none";
  } else {
    dropdownMenuContainer.style.display = "block";
  }
}

serviceLink.addEventListener("keydown", e => {
  if (e.code !== "Enter") return
    toggleDropDownMenuContainer()
});

// Width must match breakpoint specified in 'intuitive_nav_menu.css'
const bootStrapLargeBreakPoint = window.matchMedia("(min-width: 992px)");

// This will allow the menu to be closed even if the user didn't close it before
window.addEventListener("resize", () => {
  if (bootStrapLargeBreakPoint.matches) {
    if (hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    }
  }
})