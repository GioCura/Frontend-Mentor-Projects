"use strict";

const ageCalculator = document.querySelector(".age-calculator__form");

function checkValidity(el) {
  if (!el.validity.valid) {
    console.log("fuuuuck");
  }
}

ageCalculator.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputs = ageCalculator.querySelectorAll("input");
  // console.log(inputs);

  inputs.forEach(checkValidity);
});
