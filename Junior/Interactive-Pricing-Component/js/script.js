"use strict";

const sliderInput = document.querySelector(".slider__input");
const pricingCategory = document.querySelector(".pricing__category");
const toggleInput = document.querySelector(".toggle__input");
const ratePrice = document.querySelector(".rate__price");

sliderInput.addEventListener("input", (event) => {
  // Dynamically sets progress bar
  let progressValue =
    ((event.target.value - event.target.min) /
      (event.target.max - event.target.min)) *
    100;

  event.target.style.background =
    "linear-gradient(to right, #A4F3EB 0%, #A4F3EB " +
    progressValue +
    "%, #ecf0fb " +
    progressValue +
    "%, #ecf0fb 100%)";

  // Switches between categories
  let e = Number(event.target.value);

  if (e === 5) {
    pricingCategory.className = "pricing__category category--1m";
  } else if (e >= 3.9 && e <= 4) {
    pricingCategory.className = "pricing__category category--500k";
  } else if (e >= 2.9 && e <= 3) {
    pricingCategory.className = "pricing__category category--100k";
  } else if (e >= 1.9 && e <= 2) {
    pricingCategory.className = "pricing__category category--50k";
  } else if (e === 1) {
    pricingCategory.className = "pricing__category category--10k";
  }
});

toggleInput.addEventListener("change", function () {
  ratePrice.classList.toggle("yearly");
});
