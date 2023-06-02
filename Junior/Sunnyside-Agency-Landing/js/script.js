"use strict";

const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header__nav");
const navItem = document.querySelectorAll(".nav__item");

hamburger.addEventListener("click", function () {
  if (!headerNav.classList.contains("nav--active")) {
    hamburger.ariaExpanded = true;
    headerNav.ariaHidden = false;
    navItem.forEach((e) => {
      e.tabIndex = "0";
    });
  } else {
    hamburger.ariaExpanded = false;
    headerNav.ariaHidden = true;
    navItem.forEach((e) => {
      e.tabIndex = "1";
    });
  }
  headerNav.classList.toggle("nav--active");
});
