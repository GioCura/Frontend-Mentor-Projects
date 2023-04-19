"use strict";

// Background Card Elements
const bgNumberEl = document.querySelector(".bg__number");
const bgNameEl = document.querySelector(".bg__name");
const bgMMEl = document.querySelector(".bg__mm");
const bgYYEl = document.querySelector(".bg__yy");
const bgCVCEl = document.querySelector(".bg__cvc");

// Form Elements
const detailsFormEl = document.querySelector(".details__form");
const nameEl = document.querySelector(".input--name");
const numberEl = document.querySelectorAll(".input--number");
const cardNumberEl = document.querySelector(".input--cardnumber");
const mmEl = document.querySelector(".input--mm");
const yyEl = document.querySelector(".input--yy");
const cvcEl = document.querySelector(".input--cvc");
const numberElArray = [...document.querySelectorAll(".input--number")];

const errorNameEl = document.querySelector(".error__name");
const errorNumberEl = document.querySelectorAll(".error__number");
let regExNumber = /^[0-9\s]*$/;

// Match background card to input
nameEl.addEventListener("input", function () {
  bgNameEl.textContent = this.value;
});

cardNumberEl.addEventListener("input", function () {
  bgNumberEl.textContent = this.value;
});

mmEl.addEventListener("input", function () {
  bgMMEl.textContent = this.value;
});

yyEl.addEventListener("input", function () {
  bgYYEl.textContent = this.value;
});

cvcEl.addEventListener("input", function () {
  bgCVCEl.textContent = this.value;
});

// Form validation before submit //
nameEl.addEventListener("change", () => {
  if (nameEl.validity.valid) {
    nameEl.classList.remove("invalid");
    // errorNameEl.textContent = "";
  } else {
    nameElError();
  }
});

numberEl.forEach((el) => {
  el.addEventListener("change", () => {
    // Gets the index of the input, then matches it to the corresponding error message element's index.
    let e = numberElArray.indexOf(el, 0) - 1;
    // Readjusts elements with index values of 1 or 0 that were substracted by 1.
    if (e === -1 || e === 0) {
      e++;
    }

    if (el.validity.valid) {
      el.classList.remove("invalid");
      errorNumberEl[e].textContent = "";
    } else {
      numberElError(el);
    }
  });
});

// Disables space for number inputs
numberEl.forEach((el) => {
  el.addEventListener("keydown", function (e) {
    if (e.key === " ") {
      e.preventDefault();
      el.style.animation = ".5s shake";

      el.addEventListener("animationend", function () {
        el.style.animation = "none";
        console.log("Yo!");
      });
    }
  });
});

// Automatically adding spaces every four digits
cardNumberEl.addEventListener("keydown", function () {
  this.value = this.value.replace(/(\d{4})(\d+)/g, "$1 $2");
});

// VALIDATION FORMULAS //
function nameElError() {
  if (nameEl.validity.valueMissing) {
    nameEl.classList.add("invalid");
    errorNameEl.textContent = "Can't be blank";
  }
}

function numberElError(el) {
  let correctFormat = regExNumber.test(el.value);
  let e = numberElArray.indexOf(el, 0) - 1;
  if (e === -1 || e === 0) {
    e++;
  }

  if (
    el.validity.valueMissing ||
    el.validity.patternMismatch ||
    (el.validity.tooShort && correctFormat)
  ) {
    el.classList.add("invalid");
  }

  if (el.validity.valueMissing) {
    errorNumberEl[e].textContent = "Can't be blank";
  }

  if (el.validity.patternMismatch) {
    errorNumberEl[e].textContent = "Wrong format, valid numbers only";
  }

  if (el.validity.tooShort && correctFormat) {
    errorNumberEl[e].textContent = "Incomplete";
  }
}
