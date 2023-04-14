"use strict";

const darkmodeInputEl = document.querySelector(".darkmode__input");
const darkmodeToggleEl = document.querySelector(".darkmode__toggle");
const cardEl = document.querySelectorAll(".card");
const cardRateEl = document.querySelectorAll(".card__rate");

function toggleTheme() {
  document.body.classList.toggle("light");
}

darkmodeToggleEl.addEventListener("keydown", (e) => {
  // Prevents default spacebar scrolling
  e.preventDefault();
  if (e.key === " " || e.key === "Enter") {
    darkmodeInputEl.click();
  }
});

darkmodeInputEl.addEventListener("change", () => {
  toggleTheme();
});
