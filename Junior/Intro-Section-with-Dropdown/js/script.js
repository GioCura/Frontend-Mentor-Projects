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
const navLeft = document.querySelector(".nav__left");
var tablet = window.matchMedia("(min-width:1024px)");

const heroContent = document.querySelector(".hero__content");

// On load fade-in (on desktops and tablets only)

window.addEventListener("load", function () {
  heroContent.classList.remove("fade-in");
});

// Media query that sets the tabindex for the nav buttons tab index.
function layoutShift(tablet) {
  if (tablet.matches) {
    navItem.forEach((e) => {
      enableTabIndex(e);
    });
    window.addEventListener("click", dropdownClickOutside);
  } else {
    navItem.forEach((e) => {
      disableTabIndex(e);
    });
    window.removeEventListener("click", dropdownClickOutside);
  }
}

layoutShift(tablet);
tablet.addEventListener("change", layoutShift);

// General functions
function resetIndex() {
  dimmer.style.zIndex = "-1";
}

function disableTabIndex(el) {
  el.tabIndex = "-1";
}

function enableTabIndex(el) {
  el.tabIndex = "0";
}

function resetScrollHeight(el) {
  el.style.height = "0";
}

// Disables dropdown menus when clicking outside of them
function dropdownClickOutside(event) {
  const withinBoundaries = event.composedPath().includes(navLeft);

  if (!withinBoundaries) {
    dropdown.forEach((e) => {
      e.classList.remove("dropdown--active");
      resetScrollHeight(e);
    });
    dropdownArrow.forEach((e) => {
      e.classList.remove("flip");
    });
    dropdownItem.forEach((e) => {
      e.tabIndex = "-1";
    });
  }
}

// Prevents the nav from flashing on load, for mobile phones.
window.addEventListener("load", function () {
  headerNav.classList.remove("hide-load");
  navMenu.classList.remove("hide-load");
  resetIndex();
});

// Controls the dropdown
dropdownTitle.forEach((el) => {
  el.addEventListener("click", function () {
    let e = dropdownTitleArray.indexOf(el, 0);
    let dropdownItemCurrent = dropdown[e].querySelectorAll(".dropdown__item");

    dropdownArrow[e].classList.toggle("flip");

    if (dropdown[e].classList.contains("dropdown--active")) {
      resetScrollHeight(dropdown[e]);
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

// Controls the hamburger menu
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
      resetScrollHeight(e);
    });
    dropdownArrow.forEach((e) => {
      e.classList.remove("flip");
    });
    // disables tab selection of nav items while menu is closed
    dropdownItem.forEach((e) => {
      disableTabIndex(e);
    });
    navItem.forEach((e) => {
      disableTabIndex(e);
    });
  } else {
    // enables tab selection of nav items
    navItem.forEach((e) => {
      enableTabIndex(e);
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

// Closes the nav menu when clicking outside of it
dimmer.addEventListener("click", function () {
  navMenu.click();
});
