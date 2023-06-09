"use strict";

const adviceTitle = document.querySelector(".advice-generator h2");
const adviceId = document.querySelector(".advice__id");
const advice = document.querySelector(".advice");
const adviceBtn = document.querySelector(".advice__btn");
const notifier = document.querySelector(".notifier");

let isDisabled = false;

function spinAnim(el) {
  el.style.animation = "0.5s spin ease-out";

  el.addEventListener("animationend", function () {
    el.style.animation = "none";
  });
}

function resetNotifier() {
  setTimeout(() => {
    notifier.textContent = "";
  }, 100);
}

function getAdvice() {
  isDisabled = true;
  adviceTitle.style.display = "none";
  advice.innerHTML = `<span class="loading"></span>`;

  fetch("https://api.adviceslip.com/advice", { cache: "no-cache" })
    .then((response) => {
      return response.json();
    })
    .then((adviceData) => {
      const adviceObj = adviceData.slip;
      adviceTitle.style.display = "block";
      adviceId.textContent = adviceObj.id;
      advice.innerHTML = `“${adviceObj.advice}”`;
      setTimeout(() => {
        adviceBtn.classList.remove("disabled");
        isDisabled = false;
        notifier.textContent = `Now showing advice number ${adviceObj.id}`;
        resetNotifier();
      }, 1200);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener("load", getAdvice);

adviceBtn.addEventListener("click", function () {
  if (isDisabled === false) {
    notifier.textContent = "Getting new advice";
    spinAnim(adviceBtn);
    adviceBtn.classList.add("disabled");
    getAdvice();
  }
});
