"use strict";

const darkmodeInputEl = document.querySelector(".darkmode__input");
const darkmodeToggleEl = document.querySelector(".darkmode__toggle");

// For transitions that fire prematurely on load
// Just place onload=noTransition() to element of choice.
// function noTransition(e) {
//   e.classList.remove("preload");
// }

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
