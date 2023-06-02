"use strict";

const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header__nav");
const navItem = document.querySelectorAll(".nav__item");

hamburger.addEventListener("click", function () {
  if (!headerNav.classList.contains("nav--active")) {
    hamburger.setAttribute("aria-expanded", true);
    headerNav.removeAttribute("aria-hidden");
    navItem.forEach((e) => {
      e.tabIndex = "0";
    });
  } else {
    hamburger.setAttribute("aria-expanded", false);
    headerNav.setAttribute("aria-hidden", true);
    navItem.forEach((e) => {
      e.tabIndex = "1";
    });
  }
  headerNav.classList.toggle("nav--active");
});
