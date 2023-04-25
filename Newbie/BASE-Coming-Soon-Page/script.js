"use strict";

const form = document.querySelector(".hero__cta");
const email = document.getElementById("email");
const emailErrorEl = document.querySelector(".email__error");
const emailSuccessEl = document.querySelector(".email__success");

// REENABLES AUTOCOMPLETE //
email.autocomplete = "on";

// VALIDATES THE FORM BEFORE AND AFTER SUBMITTING //
email.addEventListener("change", () => {
  if (email.validity.valid) {
    emailSuccess();
  } else {
    emailError();
  }
});

// VALIDATES THE FORM UPON SUBMITTING //
form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    event.preventDefault();
    emailError();
  } else if (email.validity.valid) {
    alert("Email successfully submitted!");
  }
});

function emailSuccess() {
  if (email.validity.valid) {
    email.className = "valid";
    form.classList.remove("invalid");
    emailSuccessEl.textContent = "Your email is valid!";
  }
}

function emailError() {
  if (email.validity.valueMissing || email.validity.typeMismatch) {
    email.className = "invalid";
    form.classList.add("invalid");
  }

  if (email.validity.valueMissing) {
    emailErrorEl.textContent = "Email cannot be empty";
  }

  if (email.validity.typeMismatch) {
    emailErrorEl.textContent = "Please provide a valid email";
  }
}
