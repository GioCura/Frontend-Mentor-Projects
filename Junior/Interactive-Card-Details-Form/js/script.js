"use strict";

// Background Card Elements
const bgNumberEl = document.querySelector(".bg__number");
const bgNameEl = document.querySelector(".bg__name");
const bgMMEl = document.querySelector(".bg__mm");
const bgYYEl = document.querySelector(".bg__yy");
const bgCVCEl = document.querySelector(".bg__cvc");

// Form Elements
const detailsEl = document.querySelector(".details");
const detailsFormEl = document.querySelector(".details__form");
const thanksEl = document.querySelector(".thanks");
const inputEl = document.querySelectorAll(".input");
const nameEl = document.querySelector(".input--name");
const numberEl = document.querySelectorAll(".input--number");
const cardNumberEl = document.querySelector(".input--cardnumber");
const mmyyInputs = document.querySelector(".mmyy__inputs");
const mmEl = document.querySelector(".input--mm");
const yyEl = document.querySelector(".input--yy");
const cvcEl = document.querySelector(".input--cvc");
const numberElArray = [...document.querySelectorAll(".input--number")];
const continueEl = document.querySelector(".form__continue");

const errorNameEl = document.querySelector(".error__name");
const errorNumberEl = document.querySelectorAll(".error__number");
const errorMMYYEl = document.querySelector(".error__mmyy");
let regExNumber = /^[0-9\s]*$/;

// REENABLES AUTOCOMPLETE //
inputEl.forEach(function (e) {
  e.autocomplete = "on";
});

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
    errorNameEl.style.height = "0";
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

    if (el.validity.valid && el !== mmEl && el !== yyEl) {
      el.classList.remove("invalid");
      errorNumberEl[e].style.height = "0";
    } else {
      numberElError(el);
    }

    if (el === mmEl && mmEl.validity.valid) {
      mmEl.classList.remove("invalid");
      mmyyCheck(yyEl);
    }

    if (el === yyEl && yyEl.validity.valid) {
      yyEl.classList.remove("invalid");
      mmyyCheck(mmEl);
    }

    if (mmEl.validity.valid && yyEl.validity.valid) {
      mmyyInputs.classList.remove("invalid");
      errorMMYYEl.style.height = 0;
    }
  });
});

// Refreshes the page upon pressing
continueEl.addEventListener("click", function () {
  location.reload();
});

// Disables space for number inputs
numberEl.forEach((el) => {
  el.addEventListener("keydown", function (e) {
    if (e.key === " ") {
      e.preventDefault();
      errorAnim(el);
    }
  });
});

// Automatically adding spaces every four digits
cardNumberEl.addEventListener("keydown", function () {
  this.value = this.value.replace(/(\d{4})(\d+)/g, "$1 $2");
});

// FORM VALIDATION WHEN USER PRESSES SUBMIT //

detailsFormEl.addEventListener("submit", (event) => {
  numberEl.forEach(function (el) {
    event.preventDefault();

    if (!el.validity.valid) {
      numberElError(el);
    }
  });

  if (!nameEl.validity.valid) {
    nameElError();
  }

  if (
    nameEl.validity.valid &&
    cardNumberEl.validity.valid &&
    mmEl.validity.valid &&
    yyEl.validity.valid &&
    cvcEl.validity.valid
  ) {
    formSuccess();
  }
});

// VALIDATION FORMULAS //

function errorAnim(el) {
  el.style.animation = ".5s shake";

  el.addEventListener("animationend", function () {
    el.style.animation = "none";
  });
}

function nameElError() {
  if (nameEl.validity.valueMissing) {
    nameEl.classList.add("invalid");
    errorNameEl.textContent = "Can't be blank";
    errorNameEl.style.height = errorNameEl.scrollHeight + "px";
  }
}

function numberElError(el) {
  let correctFormat = regExNumber.test(el.value);
  let e = numberElArray.indexOf(el, 0) - 1;
  if (e === -1 || e === 0) {
    e++;
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

  if (
    el.validity.valueMissing ||
    el.validity.patternMismatch ||
    (el.validity.tooShort && correctFormat)
  ) {
    el.classList.add("invalid");
    errorNumberEl[e].style.height = errorNumberEl[e].scrollHeight + "px";
  }

  if (el === yyEl || el === mmEl) {
    mmyyInputs.classList.add("invalid");
  }
}

function mmyyCheck(e) {
  if (!e.validity.valid) {
    numberElError(e);
  }
}

function formSuccess() {
  detailsEl.classList.toggle("success");
}
