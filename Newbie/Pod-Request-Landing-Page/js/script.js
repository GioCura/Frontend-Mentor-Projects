"use strict";

const heroCta = document.querySelector(".hero__cta");
const ctaInput = document.querySelector(".cta__input");
const ctaError = document.querySelector(".cta__error");

// Re-enables autocomplete upon page load (for Firefox)
ctaInput.autocomplete = "on";

// Error script for the input
function emailError() {
  ctaInput.classList.add("error");
  ctaError.classList.add("error--active");
  ctaError.style.height = ctaInput.scrollHeight + "px";
}

// Form validation upon submission
heroCta.addEventListener("submit", function (e) {
  if (!ctaInput.validity.valid) {
    e.preventDefault();
    emailError();
  } else {
    alert("Email sumbitted!");
  }
});

// Form validation upon changing input
ctaInput.addEventListener("change", function () {
  if (ctaInput.validity.valid) {
    ctaInput.classList.remove("error");
    ctaError.classList.remove("error--active");
    ctaError.style.height = "0";
  } else {
    emailError();
  }
});
