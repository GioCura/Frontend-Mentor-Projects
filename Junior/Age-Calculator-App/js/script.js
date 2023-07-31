"use strict";

const ageCalculator = document.querySelector(".age-calculator__form");
const inputs = ageCalculator.querySelectorAll("input");
const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");
const currentDate = new Date()
  .toJSON()
  .slice(0, 10)
  .replace(/-/g, "/")
  .replace(/(?<=\/)0/g, "");
let dateIsLeapYear;

function checkValidity(e) {
  if (e.validity.valid) return;
  if (e.validity.valueMissing) console.log(`This field is required`);
  if (e.validity.patternMismatch) console.log(`Must be a valid ${e.id}`);
}

function checkYearValidity() {
  if (+inputYear.value > new Date().getFullYear()) {
    console.log("Must be past or present year!");
  }
}

function checkLeapYear() {
  dateIsLeapYear = +inputYear.value % 4 === 0 ? true : false;
  console.log(dateIsLeapYear);
}

function checkDayValidity() {
  const monthsWith30Days = [4, 6, 9, 11];
  const monthHas30Days = monthsWith30Days.some((month) =>
    inputMonth.value.includes(month)
  );
  const monthIsFebruary = +inputMonth.value === 2;

  if (
    (monthHas30Days && +inputDay.value > 30) ||
    (monthIsFebruary && +inputDay.value > (dateIsLeapYear ? 29 : 28))
  )
    console.log(`Must be a valid date`);
}

function checkDateValidity() {
  const dateArr = [inputYear.value, inputMonth.value, inputDay.value];
  const dateStr = dateArr.join("/");

  if (dateStr > currentDate) console.log(`Must be in the past!`);
}

ageCalculator.addEventListener("submit", function (e) {
  e.preventDefault();

  inputs.forEach(checkValidity);
  checkYearValidity();
  checkLeapYear();
  checkDayValidity();
  checkDateValidity();
});
