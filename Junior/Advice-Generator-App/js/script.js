"use strict";

const adviceId = document.querySelector(".advice__id");
const advice = document.querySelector(".advice");
const adviceBtn = document.querySelector(".advice__btn");

adviceBtn.addEventListener("click", getAdvice);

function getAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => {
      return response.json();
    })
    .then((adviceData) => {
      const adviceObj = adviceData.slip;
      adviceId.textContent = adviceObj.id;
      advice.textContent = adviceObj.advice;
    })
    .catch((error) => {
      console.log(error);
    });
}
