"use strict";

const heroCta = document.querySelector(".hero__cta");
const ctaInput = document.querySelector(".cta__input");
const ctaError = document.querySelector(".cta__error");
const loadAnim = document.querySelectorAll(".load-anim");

let tablet = window.matchMedia("(min-width: 48em)");

// Re-enables autocomplete upon page load (for Firefox)
ctaInput.autocomplete = "on";

function addHeight(el) {
  el.style.height = el.scrollHeight + "px";
}

function removeHeight(el) {
  el.style.height = "0";
}

function setAriaInvalid(el) {
  el.setAttribute("aria-invalid", "true");
}

function removeAriaInvalid(el) {
  el.removeAttribute("aria-invalid");
}

function clear(el) {
  el.textContent = "";
}

// Error script for the input
function emailError() {
  ctaInput.classList.add("error");
  ctaError.classList.add("error--active");
  ctaError.textContent = "Oops! Please check your email";
  setAriaInvalid(ctaInput);
  if (!tablet.matches) addHeight(ctaError);
}

// Success script for the input
function emailSuccess() {
  ctaInput.classList.remove("error");
  ctaError.classList.remove("error--active");
  setTimeout(() => {
    clear(ctaError);
  }, 500);
  removeAriaInvalid(ctaInput);
  if (!tablet.matches) removeHeight(ctaError);
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
    emailSuccess();
  } else {
    emailError();
  }
});

// Fade in animation for desktop screens
window.addEventListener("load", function () {
  loadAnim.forEach((el) => {
    el.classList.remove("hidden", "hidden-down");
  });
});
