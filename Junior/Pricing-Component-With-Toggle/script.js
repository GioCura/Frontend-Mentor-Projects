const planInputEl = document.querySelector(".plan__input");
const planButtonEl = document.querySelector(".plan__button");
const cardPriceEl = document.querySelectorAll(".card__price");

function togglePrice() {
  cardPriceEl.forEach((e) => {
    e.classList.toggle("monthly");
  });
}

planButtonEl.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    planInputEl.click();
  }
});

planInputEl.addEventListener("change", () => {
  togglePrice();
});
