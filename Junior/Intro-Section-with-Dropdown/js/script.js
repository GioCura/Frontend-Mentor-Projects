"use strict";

const headerNav = document.querySelector(".header__nav");
const navMenu = document.querySelector(".nav__menu");
const menuOpen = document.querySelector(".menu--open");
const menuClose = document.querySelector(".menu--close");
const dimmer = document.querySelector(".dimmer");

const dropdownTitle = document.querySelectorAll(".dropdown__title");
const dropdown = document.querySelectorAll(".dropdown");
const dropdownTitleArray = [...document.querySelectorAll(".dropdown__title")];
const dropdownArrow = document.querySelectorAll(".dropdown__arrow");

const navItem = document.querySelectorAll(".nav__item");
const dropdownItem = document.querySelectorAll(".dropdown__item");
const navLeft = document.querySelector(".nav__left");
const heroContent = document.querySelector(".hero__content");

var tablet = window.matchMedia("(min-width:1024px)");
let timeout;

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

function ariaHiddenTrue(el) {
  el.ariaHidden = true;
}

function removeAriaHidden(el) {
  el.removeAttribute("aria-hidden");
}

function ariaExpandedTrue(el) {
  el.ariaExpanded = true;
}

function ariaExpandedFalse(el) {
  el.ariaExpanded = false;
}

// Temporarily disables header's transition, then quickly re-enables it (to prevent the mobile header from flashing when resizing the window.)

function resetHeaderTransition() {
  headerNav.style.transition = "none";

  timeout = setTimeout(function () {
    headerNav.style.transition = "all 0.5s";
  }, 100);
}

// Disables dropdown menus when clicking outside of them
function dropdownClickOutside(event) {
  const withinBoundaries = event.composedPath().includes(navLeft);

  if (!withinBoundaries) {
    dropdown.forEach((e) => {
      e.classList.remove("dropdown--active");
      resetScrollHeight(e);
      ariaHiddenTrue(e);
    });
    dropdownArrow.forEach((e) => {
      e.classList.remove("flip");
    });
    dropdownItem.forEach((e) => {
      disableTabIndex(e);
    });
  }
}

// Prevents the nav from flashing on load, for mobile phones, as well as setting the dimmer's z-index.
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
        disableTabIndex(e);
      });
      ariaHiddenTrue(dropdown[e]);
      ariaExpandedFalse(el);
    } else {
      dropdown[e].style.height = dropdown[e].scrollHeight + "px";
      dropdownItemCurrent.forEach((e) => {
        enableTabIndex(e);
      });
      removeAriaHidden(dropdown[e]);
      ariaExpandedTrue(el);
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
    menuClose.style.display = "none";
    menuOpen.style.display = "block";
    ariaHiddenTrue(headerNav);
    ariaExpandedFalse(navMenu);
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
    menuClose.style.display = "block";
    menuOpen.style.display = "none";
    removeAriaHidden(headerNav);
    ariaExpandedTrue(navMenu);
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

// On load fade-in (on desktops and tablets only)

window.addEventListener("load", function () {
  heroContent.classList.remove("fade-in");
});

// Checks if nav is opened when resizing to tablet layout.
function navCheck() {
  if (!headerNav.classList.contains("nav--active")) {
    ariaHiddenTrue(headerNav);
    navItem.forEach((e) => {
      disableTabIndex(e);
    });
  }
}

// Media queries that include resetting tabindex for nav buttons, among other things.
function layoutShift(tablet) {
  if (tablet.matches) {
    navItem.forEach((e) => {
      enableTabIndex(e);
    });
    window.addEventListener("click", dropdownClickOutside);
    clearTimeout(timeout);
    headerNav.style.transition = "none";
    removeAriaHidden(headerNav);
  } else {
    window.removeEventListener("click", dropdownClickOutside);
    resetHeaderTransition();
    navCheck();
  }
}

layoutShift(tablet);
tablet.addEventListener("change", layoutShift);
