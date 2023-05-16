"use strict";

const headerNav = document.querySelector(".header__nav");
const navMenu = document.querySelector(".nav__menu");
const dimmer = document.querySelector(".dimmer");

const dropdownHeading = document.querySelectorAll(".dropdown__heading");
const dropdown = document.querySelectorAll(".dropdown");
const dropdownHeadingArray = [
  ...document.querySelectorAll(".dropdown__heading"),
];
const dropdownArrow = document.querySelectorAll(".dropdown__arrow");

window.addEventListener("load", function () {
  headerNav.classList.remove("hide-load");
});

navMenu.addEventListener("click", function () {
  dimmer.classList.toggle("dimmer--active");
  headerNav.classList.toggle("nav--active");
});

dropdownHeading.forEach((el) => {
  el.addEventListener("click", function () {
    // console.log(dropdownHeadingArray.indexOf(el, 0));
    let e = dropdownHeadingArray.indexOf(el, 0);

    dropdownArrow[e].classList.toggle("flip");

    if (dropdown[e].classList.contains("dropdown--active")) {
      dropdown[e].style.height = "0";
    } else {
      dropdown[e].style.height = dropdown[e].scrollHeight + "px";
    }

    dropdown[e].classList.toggle("dropdown--active");
  });
});
