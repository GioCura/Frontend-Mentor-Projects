"use strict";

const hamburger = document.querySelector(".hamburger");
const header = document.querySelector("header");
const headerNav = document.querySelector(".header__nav");
const navItem = document.querySelectorAll(".nav__item");
const sectionHome = document.querySelector(".home");
const links = document.querySelectorAll("a:link");

let desktop = window.matchMedia("(min-width: 1180px)");
let timeout;

function ariaHiddenTrue(el) {
  el.setAttribute("aria-hidden", true);
}

function removeAriaHidden(el) {
  el.removeAttribute("aria-hidden");
}

function enableTabIndex(el) {
  el.tabIndex = "0";
}

function disableTabIndex(el) {
  el.tabIndex = "-1";
}

// Closes nav upon clicking away from the header
function navClickOutside(event) {
  const withinBoundaries = event.composedPath().includes(header);

  if (!withinBoundaries) {
    closeNav();
  }
}

function openNav() {
  headerNav.classList.add("nav--active");
  hamburger.setAttribute("aria-expanded", true);
  removeAriaHidden(headerNav);
  navItem.forEach((e) => {
    enableTabIndex(e);
  });
  window.addEventListener("click", navClickOutside);
  // Close menu upon clicking on a link
  links.forEach((e) => {
    e.addEventListener("click", closeNav);
  });
}

function closeNav() {
  headerNav.classList.remove("nav--active");
  hamburger.setAttribute("aria-expanded", false);
  ariaHiddenTrue(headerNav);
  navItem.forEach((e) => {
    disableTabIndex(e);
  });
  window.removeEventListener("click", navClickOutside);
  links.forEach((e) => {
    e.removeEventListener("click", closeNav);
  });
}

// Hamburger menu controls
hamburger.addEventListener("click", function () {
  if (!headerNav.classList.contains("nav--active")) {
    openNav();
  } else {
    closeNav();
  }
});

// For the sticky header

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      header.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      header.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-74px",
  }
);

obs.observe(sectionHome);

// Temporarily disables header's transition, then quickly re-enables it (to prevent the mobile header from flashing when resizing the window.)

function resetHeaderTransition() {
  headerNav.style.transition = "none";

  timeout = setTimeout(function () {
    headerNav.style.transition = "opacity 0.3s ease-in-out";
  }, 100);
}

// Media query for switch between desktop and mobile layouts
function layoutShift(desktop) {
  if (desktop.matches) {
    removeAriaHidden(headerNav);
    navItem.forEach((e) => {
      enableTabIndex(e);
    });
    links.forEach((e) => {
      e.removeEventListener("click", closeNav);
    });
    window.removeEventListener("click", navClickOutside);
  } else {
    ariaHiddenTrue(headerNav);
    navItem.forEach((e) => {
      disableTabIndex(e);
    });
    resetHeaderTransition();
    closeNav();
  }
}

layoutShift(desktop);
desktop.addEventListener("change", layoutShift);

window.addEventListener("load", function () {
  headerNav.classList.remove("hide-load");
});
