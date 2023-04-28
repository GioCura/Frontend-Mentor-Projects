"use strict";

const darkmodeInputEl = document.querySelector(".darkmode__input");
const darkmodeToggleEl = document.querySelector(".darkmode__toggle");
const renderFixEl = document.querySelectorAll(".renderfix");
let timeout;

// Resets checked state for Firefox
darkmodeInputEl.checked = false;

// Resets the will-change as per best practice
function renderFix() {
  timeout = setTimeout(function () {
    renderFixEl.forEach((e) => {
      e.style.willChange = "auto";
    });
  }, 5000);
}

// Function that adds the active class
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Enables toggle to be activated by spacebar or enter when it's focused
darkmodeToggleEl.addEventListener("keydown", function (e) {
  if (e.key === " " || e.key === "Enter") {
    // Prevents default spacebar scrolling
    e.preventDefault();
    darkmodeInputEl.click();
  }
});

// Activates the toggle function when the user activates the toggle.
darkmodeInputEl.addEventListener("change", function () {
  toggleTheme();
  // Resets focus when user activates the toggle, thereby retaining the will-change "transform" attribute
  darkmodeToggleEl.focus();
});

// Hover in and out events
["mouseover", "focusin"].forEach(function (e) {
  darkmodeToggleEl.addEventListener(e, function () {
    // Cancels the timeout to set the will-change to "auto", if user has moused or focused out of the toggle.
    clearTimeout(timeout);
    renderFixEl.forEach((e) => {
      e.style.willChange = "transform";
    });
  });
});

["mouseout", "focusout"].forEach(function (e) {
  darkmodeToggleEl.addEventListener(e, function () {
    renderFix();
  });
});
