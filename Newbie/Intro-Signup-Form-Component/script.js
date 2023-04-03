"use strict";

const signupFormEl = document.querySelector(".signup__form");

const signupName = document.querySelectorAll(".signup__name");
const email = document.getElementById("email");
const password = document.getElementById("password");

const emailErrorEl = document.querySelector(".error__email");
const passwordErrorEl = document.querySelector(".error__password");
// FORM VALIDATION WHILE USER IS INPUTTING DATA //
signupName.forEach((el) => {
  el.addEventListener("change", () => {
    if (el.validity.valid) {
      el.parentNode.children[2].textContent = "";
      el.className = "";
    } else {
      nameError(el);
    }
  });
});

email.addEventListener("change", () => {
  if (email.validity.valid) {
    emailErrorEl.textContent = "";
    email.className = "";
  } else {
    emailError();
  }
});

password.addEventListener("change", () => {
  if (password.validity.valid) {
    passwordErrorEl.textContent = "";
    password.className = "";
  } else {
    passwordError();
  }
});

// FORM VALIDATION WHEN USER PRESSES SUBMIT //

signupFormEl.addEventListener("submit", (event) => {
  signupName.forEach(function (el) {
    if (!el.validity.valid) {
      event.preventDefault();
      nameError(el);
    }
  });

  if (!email.validity.valid) {
    event.preventDefault();
    emailError();
  }

  if (!password.validity.valid) {
    event.preventDefault();
    passwordError();
  }
});

// FORM VALIDATION FORMULAS //

function nameError(el) {
  if (el.validity.valueMissing) {
    el.parentNode.children[2].textContent = `${el.name} cannot be empty`;
    el.className = "invalid";
    el.placeholder = "";
  }
}

function emailError() {
  if (email.validity.valueMissing || email.validity.typeMismatch) {
    email.className = "invalid";
    email.placeholder = "";
  }

  if (email.validity.valueMissing) {
    emailErrorEl.textContent = "Email cannot be empty";
  } else if (email.validity.typeMismatch) {
    emailErrorEl.textContent = "Looks like this is not an email";
  }
}

function passwordError() {
  if (password.validity.valueMissing || password.validity.tooShort) {
    password.className = "invalid";
    password.placeholder = "";
  }

  if (password.validity.valueMissing) {
    passwordErrorEl.textContent = "Password cannot be empty";
  } else if (password.validity.tooShort) {
    passwordErrorEl.textContent = "Password should be at least 8 characters";
  }
}
