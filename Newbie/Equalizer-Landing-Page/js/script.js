"use strict";

const heroEl = document.querySelector(".hero");
const ctaEl = document.querySelector(".cta");
const ctaPhoneEl = document.querySelector(".cta__phone img");
const ctaCardEl = document.querySelector(".cta__card");
const hiddenLazy = document.querySelectorAll(".hidden-lazy");

let options = {
  threshold: 0.6,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden-up");
      entry.target.classList.remove("hidden-left");
      entry.target.classList.remove("hidden-right");
    }
  });
}, options);

window.addEventListener("load", function () {
  heroEl.classList.remove("hidden");
});

hiddenLazy.forEach((el) => {
  observer.observe(el);
});
