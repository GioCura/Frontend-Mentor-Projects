"use strict";

const heroCta = document.querySelector(".hero__cta");
const ctaInput = document.querySelector(".cta__input");
const ctaError = document.querySelector(".cta__error");

let tablet = window.matchMedia("(min-width: 48em)");

// Re-enables autocomplete upon page load (for Firefox)
ctaInput.autocomplete = "on";

// Error script for the input
function emailError() {
  ctaInput.classList.add("error");
  ctaInput.setAttribute("aria-invalid", "true");
  ctaError.classList.add("error--active");
  ctaError.textContent = "Oops! Please check your email";
  addHeight(ctaError);
}

function addHeight() {
  if (!tablet.matches) {
    ctaError.style.height = ctaError.scrollHeight + "px";
  }
}

function removeHeight() {
  if (!tablet.matches) {
    ctaError.style.height = "0";
  }
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
    ctaInput.removeAttribute("aria-invalid");
    ctaError.classList.remove("error--active");
    ctaError.textContent = "";
    removeHeight(ctaError);
  } else {
    emailError();
  }
});
