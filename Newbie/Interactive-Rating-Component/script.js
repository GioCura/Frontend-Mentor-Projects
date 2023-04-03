const formEl = document.querySelector(".form");
const displayedRatingEl = document.querySelector(".thanks__rating");
const cardEl = document.querySelector(".card");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let selectedButton = document.querySelector('input[type = "radio"]:checked');

  if (selectedButton === null) {
    alert("Please input a rating!");
  } else {
    cardEl.classList.toggle("thanks--show-yes");
    // formEl.style.opacity = "0";
    displayedRatingEl.textContent = selectedButton.getAttribute("id");
  }
});
