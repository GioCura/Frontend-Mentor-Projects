"use strict";

const hamburger = document.querySelector(".hamburger");
const header = document.querySelector("header");
const headerNav = document.querySelector(".header__nav");
const homeImg = document.querySelector(".home__img");
const homeTitle = document.querySelector(".home__content h1");
const arrow = document.querySelector(".arrow");
const navItem = document.querySelectorAll(".nav__item");
const sectionHome = document.querySelector(".home");
const HEADER_TRANS = "opacity 0.3s ease-in-out";
const HEADER_TIMEOUT = 100;

let desktop = window.matchMedia("(min-width: 73.75em)");

// General functions

function setAriaHiddenTrue(el) {
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

function setAriaExpandedTrue(el) {
  el.setAttribute("aria-expanded", true);
}

function setAriaExpandedFalse(el) {
  el.setAttribute("aria-expanded", false);
}

function controlNavClickEvents(e) {
  const withinBoundaries = e.composedPath().includes(header);
  const link = e.target.closest("a:link");

  if (!withinBoundaries || link) closeNav();
}

// Helper functions

function enableNavTabIndex() {
  navItem.forEach((e) => {
    enableTabIndex(e);
  });
}

function disableNavTabIndex() {
  navItem.forEach((e) => {
    disableTabIndex(e);
  });
}

// Function for opening and closing the nav

function openNav() {
  headerNav.classList.add("nav--active");
  setAriaExpandedTrue(hamburger);
  removeAriaHidden(headerNav);
  enableNavTabIndex();
  window.addEventListener("click", controlNavClickEvents);
}

function closeNav() {
  headerNav.classList.remove("nav--active");
  setAriaExpandedFalse(hamburger);
  setAriaHiddenTrue(headerNav);
  disableNavTabIndex();
  window.removeEventListener("click", controlNavClickEvents);
}

function controlHamburgerMenu() {
  if (!headerNav.classList.contains("nav--active")) {
    openNav();
  } else {
    closeNav();
  }
}

// Sticky header upon scrolling past home section

const stickyHeader = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) header.classList.add("sticky");
    if (ent.isIntersecting) header.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-74px",
  }
);

// Temporarily disables header's transition, then quickly re-enables it (to prevent the mobile header from flashing when resizing the window.)

function resetHeaderTransition() {
  headerNav.style.transition = "none";

  setTimeout(function () {
    headerNav.style.transition = `${HEADER_TRANS}`;
  }, HEADER_TIMEOUT);
}

// Media query for switch between desktop and mobile layouts
function checkLayoutShift(desktop) {
  if (desktop.matches) {
    removeAriaHidden(headerNav);
    enableNavTabIndex();
    window.removeEventListener("click", controlNavClickEvents);
  } else {
    resetHeaderTransition();
    closeNav();
  }
}

// Handles on-load animations

function loadAnimations() {
  header.classList.remove("hide-load");
  homeImg.classList.remove("fade-up");
  homeTitle.classList.remove("fade-down");
  arrow.classList.remove("fade-down");
}

function init() {
  hamburger.addEventListener("click", controlHamburgerMenu);
  window.addEventListener("load", loadAnimations);
  desktop.addEventListener("change", checkLayoutShift);
  stickyHeader.observe(sectionHome);
}

init();
