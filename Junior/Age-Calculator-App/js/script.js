"use strict";

const ageCalculator = document.querySelector(".age-calculator__form");
const inputs = ageCalculator.querySelectorAll("input");
const inputsArr = [...inputs];
const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const currentDateStr = currentDate
  .toJSON()
  .slice(0, 10)
  .replace(/-/g, "/")
  .replace(/(?<=\/)0/g, "");
let dateIsLeapYear;

console.log(inputsArr);

// function only allows one error to be thrown.
async function checkValidity(e) {
  try {
    if (e.validity.valid) return;
    if (e.validity.valueMissing) throw new Error(`This field is required`);
    if (e.validity.patternMismatch) throw new Error(`Must be a valid ${e.id}`);
  } catch (err) {
    e.parentNode.querySelector(".error").textContent = err.message;
    throw err;
  }
}

async function checkYearValidity() {
  try {
    if (+inputYear.value > currentYear)
      throw new Error("Must be past or present year!");
  } catch (err) {
    inputYear.parentNode.querySelector(".error").textContent = err.message;
    throw err;
  }
}

function checkLeapYear() {
  dateIsLeapYear = +inputYear.value % 4 === 0 ? true : false;
  // console.log(dateIsLeapYear);
}

async function checkDayValidity() {
  const monthsWith30Days = [4, 6, 9, 11];
  const monthHas30Days = monthsWith30Days.some((month) =>
    inputMonth.value.includes(month)
  );
  const monthIsFebruary = +inputMonth.value === 2;

  try {
    if (
      (monthHas30Days && +inputDay.value > 30) ||
      (monthIsFebruary && +inputDay.value > (dateIsLeapYear ? 29 : 28))
    )
      throw new Error(`Must be a valid date`);
  } catch (err) {
    inputDay.parentNode.querySelector(".error").textContent = err.message;
    throw err;
  }
}

async function checkDateValidity() {
  const dateArr = [+inputYear.value, +inputMonth.value, +inputDay.value];
  const dateStr = dateArr.join("/");

  try {
    if (dateStr > currentDateStr) throw new Error(`Must be in the past!`);
  } catch (err) {
    inputYear.parentNode.querySelector(".error").textContent = err.message;
    throw err;
  }
}

ageCalculator.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    await Promise.all([...inputs].map(checkValidity));
    await checkYearValidity();
    checkLeapYear();
    await checkDayValidity();
    await checkDateValidity();
    console.log("success");
  } catch (err) {
    console.error(err);
  }
});
