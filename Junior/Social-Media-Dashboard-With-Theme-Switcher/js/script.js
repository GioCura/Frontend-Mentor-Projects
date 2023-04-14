"use strict";

const darkmodeInputEl = document.querySelector(".darkmode__input");
const darkmodeToggleEl = document.querySelector(".darkmode__toggle");
const renderFixEl = document.querySelectorAll(".renderfix");

// Resets the will-change as per best practice
function renderFix() {
  setTimeout(function () {
    renderFixEl.forEach((e) => {
      e.style.willChange = "auto";
    });
  }, 5000);
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

// Enables toggle to be activated by spacebar or enter when it's focused
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
