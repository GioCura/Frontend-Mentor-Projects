"use strict";

const hamburger = document.querySelector(".hamburger");
const header = document.querySelector("header");
const headerNav = document.querySelector(".header__nav");
const navItem = document.querySelectorAll(".nav__item");
const sectionHome = document.querySelector(".home");

function openNav() {
  headerNav.classList.add("nav--active");
  hamburger.setAttribute("aria-expanded", true);
  headerNav.removeAttribute("aria-hidden");
  navItem.forEach((e) => {
    e.tabIndex = "0";
  });
}

function closeNav() {
  headerNav.classList.remove("nav--active");
  hamburger.setAttribute("aria-expanded", false);
  headerNav.setAttribute("aria-hidden", true);
  navItem.forEach((e) => {
    e.tabIndex = "-1";
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

// Close menu upon clicking on a link
const links = document.querySelectorAll("a:link");
links.forEach((e) => {
  e.addEventListener("click", closeNav);
});

// Closes nav upon clicking away from the header
function navClickOutside(event) {
  const withinBoundaries = event.composedPath().includes(header);

  if (!withinBoundaries) {
    closeNav();
  }
}

window.addEventListener("click", navClickOutside);

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
