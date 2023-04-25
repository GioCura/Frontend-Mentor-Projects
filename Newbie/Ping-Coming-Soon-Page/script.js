"use strict";

const form = document.querySelector(".hero__cta");
const ctaEmail = document.querySelector(".cta__email");
const email = document.getElementById("email");
const emailErrorEl = document.querySelector(".email__error");

// REENABLES AUTOCOMPLETE (FOR FIREFOX)
ctaEmail.autocomplete = "on";

// VALIDATES THE FORM BEFORE AND AFTER SUBMITTING //
email.addEventListener("change", () => {
  if (email.validity.valid) {
    email.className = "";
    const handle = setTimeout(() => {
      emailErrorEl.textContent = "";
      clearTimeout(handle);
    }, 1000);
  } else {
    emailError();
  }
});

// VALIDATES THE FORM UPON SUBMITTING //
form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    event.preventDefault();
    emailError();
  }
});

function emailError() {
  if (email.validity.valueMissing || email.validity.typeMismatch) {
    email.className = "invalid";
  }

  if (email.validity.valueMissing) {
    emailErrorEl.textContent =
      "Whoops! It looks like you forgot to add your email";
  }

  if (email.validity.typeMismatch) {
    emailErrorEl.textContent = "Please provide a valid email address";
  }
}
