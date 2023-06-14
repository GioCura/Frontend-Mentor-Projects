"use strict";

const adviceTitle = document.querySelector(".advice-generator h1");
const adviceId = document.querySelector(".advice__id");
const advice = document.querySelector(".advice");
const adviceBtn = document.querySelector(".advice__btn");

adviceBtn.addEventListener("click", getAdvice);

function getAdvice() {
  adviceTitle.style.display = "none";
  advice.innerHTML = `<span class="loading"></span>`;
  fetch("https://api.adviceslip.com/advice")
    .then((response) => {
      return response.json();
    })
    .then((adviceData) => {
      const adviceObj = adviceData.slip;
      adviceTitle.style.display = "block";
      adviceId.textContent = adviceObj.id;
      advice.innerHTML = `“${adviceObj.advice}”`;
    })
    .catch((error) => {
      console.log(error);
    });
}
