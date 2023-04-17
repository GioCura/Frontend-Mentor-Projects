"use strict";

const detailsFormEl = document.querySelector(".details__form");
const nameEl = document.querySelector(".input--name");
const numberEl = document.querySelectorAll(".input--number");
const numberElArray = [...document.querySelectorAll(".input--number")];

let errorNameEl = document.querySelector(".error__name");
let errorNumberEl = document.querySelectorAll(".error__number");
let regExNumber = /^[0-9\s]*$/;

// FORM VALIDATION WHILE USER IS INPUTTING DATA //
nameEl.addEventListener("change", () => {
  if (nameEl.validity.valid) {
    nameEl.classList.remove("invalid");
    errorNameEl.textContent = "";
  } else {
    nameElError();
  }
});

numberEl.forEach((el) => {
  el.addEventListener("change", () => {
    let e = numberElArray.indexOf(el, 0) - 1;
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

  // if (e === -1) {
  //   e = 0;
  // } else if (e === 0) {
  //   e++;
  // }

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
    errorNumberEl[e].textContent = "Value is too short";
  }
}
