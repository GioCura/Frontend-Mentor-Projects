"use strict";

const headerNav = document.querySelector(".header__nav");
const navMenu = document.querySelector(".nav__menu");
const dimmer = document.querySelector(".dimmer");

const dropdownTitle = document.querySelectorAll(".dropdown__title");
const dropdown = document.querySelectorAll(".dropdown");
const dropdownTitleArray = [...document.querySelectorAll(".dropdown__title")];
const dropdownArrow = document.querySelectorAll(".dropdown__arrow");

const navItem = document.querySelectorAll(".nav__item");
const dropdownItem = document.querySelectorAll(".dropdown__item");

var navMenuState = window.getComputedStyle(navMenu, null).display;

// For future media query that will reset the tabindex for the nav links.
// if (navMenuState === "none") {
//   console.log("Yahoo!");
// }

window.addEventListener("load", function () {
  headerNav.classList.remove("hide-load");
  navMenu.classList.remove("hide-load");
  dimmer.style.zIndex = "-1";
});

dropdownTitle.forEach((el) => {
  el.addEventListener("click", function () {
    let e = dropdownTitleArray.indexOf(el, 0);
    let dropdownItemCurrent = dropdown[e].querySelectorAll(".dropdown__item");

    dropdownArrow[e].classList.toggle("flip");

    if (dropdown[e].classList.contains("dropdown--active")) {
      dropdown[e].style.height = "0";
      dropdownItemCurrent.forEach((e) => {
        e.tabIndex = "-1";
      });
    } else {
      dropdown[e].style.height = dropdown[e].scrollHeight + "px";
      dropdownItemCurrent.forEach((e) => {
        e.tabIndex = "0";
      });
    }

    dropdown[e].classList.toggle("dropdown--active");
  });
});

navMenu.addEventListener("click", function () {
  // resets the z-index -- avoids flashing of featured images on transition
  if (dimmer.classList.contains("dimmer--active")) {
    dimmer.addEventListener("transitionend", resetIndex);
  } else {
    dimmer.style.zIndex = "1";
    dimmer.removeEventListener("transitionend", resetIndex);
  }

  if (headerNav.classList.contains("nav--active")) {
    // resets the dropdown state
    dropdown.forEach((e) => {
      e.classList.remove("dropdown--active");
      e.style.height = "0";
    });
    dropdownArrow.forEach((e) => {
      e.classList.remove("flip");
    });
    // disables tab selection of nav items while menu is closed
    dropdownItem.forEach((e) => {
      e.tabIndex = "-1";
    });
    navItem.forEach((e) => {
      e.tabIndex = "-1";
    });
  } else {
    // enables tab selection of nav items
    navItem.forEach((e) => {
      e.tabIndex = "0";
    });
  }

  dimmer.classList.toggle("dimmer--active");
  headerNav.classList.toggle("nav--active");

  document.body.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Backspace") {
      navMenu.click();
    }
  });
});

dimmer.addEventListener("click", function () {
  navMenu.click();
});

function resetIndex() {
  dimmer.style.zIndex = "-1";
}
