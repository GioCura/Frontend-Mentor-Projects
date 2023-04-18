"use strict";

const cardEl = document.querySelectorAll(".card");
let timeout;

function removeRender() {
  timeout = setTimeout(function () {
    cardEl.forEach((e) => {
      e.style.willChange = "auto";
    });
  }, 5000);
}

function prepRender() {
  this.style.willChange = "transform";
  clearTimeout(timeout);
}

cardEl.forEach((e) => {
  e.addEventListener("mouseover", prepRender);
});

cardEl.forEach((e) => {
  e.addEventListener("mouseout", removeRender);
});
