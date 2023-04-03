const cardItemEl = document.querySelectorAll(".card__item");
let activeAnswerEl = document.querySelector(
  ".card__answer--active .card__answer"
);

// Reveals the answer that is meant to be shown on load.
function preloadAnswer() {
  activeAnswerEl.style.height = activeAnswerEl.scrollHeight + "px";
}

// Hides the answer
function closeAnswer(e) {
  e.classList.remove("card__answer--active");
  e.children[1].style.height = "0";
  e.children[1].style.transition = "height 0.5s";
}

// Reveals the answer
function openAnswer(e) {
  e.classList.add("card__answer--active");
  e.children[1].style.height = e.children[1].scrollHeight + "px";
  e.children[1].style.transition = "height 0.5s";
  e.children[1].style.animation = "fade 0.5s ease-in-out";
}

// Iterates through each element with ".card__item"
cardItemEl.forEach((el) => {
  // For each element, there's an event that triggers on click
  el.addEventListener("click", () => {
    // For each clicked ".card__item", the following should be done
    cardItemEl.forEach(function (item) {
      // Identifies elements with the active class and removes it from them
      if (item.classList.contains("card__answer--active")) {
        closeAnswer(item);
        // If the item is the one that was clicked, this adds the active state
      } else if (item === el) {
        openAnswer(item);
      }
    });
  });
});
