let commentSectionIsHidden = false;

const showHideCommentsBtn = document.getElementById(
  "show-hide-comment-section-btn"
);
const commentSectionContainer = document.getElementById(
  "comment-section-container"
);

showHideCommentsBtn.addEventListener("click", () => {
  if (commentSectionIsHidden) {
    commentSectionContainer.style.display = "block";
    showHideCommentsBtn.innerHTML = "Hide comments";
    commentSectionIsHidden = false;
  } else {
    commentSectionContainer.style.display = "none";
    showHideCommentsBtn.innerHTML = "Show comments";
    commentSectionIsHidden = true;
  }
});
