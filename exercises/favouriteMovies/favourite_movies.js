const modal = document.getElementById("poster-modal");
const posterImage = document.getElementById("poster-image");
const closeModalContainer = document.querySelector(".close-modal-container");

document.querySelectorAll(".poster-link").forEach(link => {
  link.addEventListener("click", () => {
    const posterUrl = link.getAttribute("data-poster");
    posterImage.src = posterUrl; // Set the image source
    modal.style.display = "block"; // Show the modal
  });
});

const hideModal = () => {
  modal.style.display = "none"; // Hide the modal
};

closeModalContainer.addEventListener("click", hideModal);
// Keyboard accessibility
closeModalContainer.addEventListener("keydown", (e) => {
  if (e.code === "Enter" || e.code === "Space") {
    hideModal();
  }
});
