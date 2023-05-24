"use strict";

const heroCta = document.querySelector(".hero__cta");
const ctaInput = document.querySelector(".cta__input");
const ctaError = document.querySelector(".cta__error");

function emailCheck() {
  if (ctaInput.validity.valid) {
    ctaInput.classList.remove("error");
    ctaError.style.height = "0";
  } else if (!ctaInput.validity.valid) {
    ctaInput.classList.add("error");
    ctaError.style.height = ctaError.scrollHeight + "px";
  }
}

heroCta.addEventListener("submit", function (e) {
  if (!ctaInput.validity.valid) {
    e.preventDefault();
    emailCheck();
  }
});

ctaInput.addEventListener("change", emailCheck);
