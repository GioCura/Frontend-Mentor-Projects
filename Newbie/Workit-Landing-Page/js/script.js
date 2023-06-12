"use strict";

const homeTitle = document.querySelector(".home h1");
const greenLinkHome = document.querySelector(".green-link--home");
const loadAnim = document.querySelectorAll(".load-anim");

let options = {
  threshold: 0.6,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("fade-in");
      entry.target.classList.remove("fade-left");
      entry.target.classList.remove("fade-right");
    }
  });
}, options);

loadAnim.forEach((el) => {
  observer.observe(el);
});

window.addEventListener("load", function () {
  homeTitle.classList.remove("fade-in");
  greenLinkHome.classList.remove("fade-in");
});
