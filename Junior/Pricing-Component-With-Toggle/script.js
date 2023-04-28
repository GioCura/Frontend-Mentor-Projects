const planInputEl = document.querySelector(".plan__input");
const planToggleEl = document.querySelector(".plan__toggle");
const cardPriceEl = document.querySelectorAll(".card__price");

// Resets toggle position for Firefox Browsers
planInputEl.checked = true;

function togglePrice() {
  cardPriceEl.forEach((e) => {
    e.classList.toggle("monthly");
  });
}

planToggleEl.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    planInputEl.click();
  }
});

planInputEl.addEventListener("change", () => {
  togglePrice();
});
