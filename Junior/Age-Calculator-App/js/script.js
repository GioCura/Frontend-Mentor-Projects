"use strict";

const ageCalculator = document.querySelector(".age-calculator__form");
const inputs = ageCalculator.querySelectorAll("input");
const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");

const monthsWith30Days = [4, 6, 9, 11];
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const currentDateStr = currentDate
  .toJSON()
  .slice(0, 10)
  .replace(/-/g, "/")
  .replace(/(?<=\/)0/g, "");

let dateIsLeapYear;
let monthHas30Days;
let monthIsFebruary;

let calcDays = 0;
let calcMonths = 0;
let calcYears = 0;

function renderError(el, err) {
  el.parentNode.querySelector(".error").textContent = err.message;
}

function checkLeapYear(year) {
  dateIsLeapYear = year % 4 === 0 ? true : false;
}

function checkMonthHas30Days(el) {
  if (monthsWith30Days.some((month) => el.includes(month)))
    monthHas30Days = true;
}

function checkMonthIsFebruary(month) {
  if (month === 2) monthIsFebruary = true;
}

async function checkValidity(entry) {
  try {
    if (entry.validity.valid) return;
    if (entry.validity.valueMissing) throw new Error(`This field is required`);
    if (entry.validity.patternMismatch)
      throw new Error(`Must be a valid ${entry.id}`);
  } catch (err) {
    renderError(entry, err);
    throw err;
  }
}

async function checkYearValidity() {
  try {
    if (+inputYear.value > currentYear)
      throw new Error("Must be past or present year!");
  } catch (err) {
    renderError(inputYear, err);
    throw err;
  }
}

async function checkDayValidity() {
  checkLeapYear(+inputYear.value);
  checkMonthHas30Days(inputMonth.value);
  checkMonthIsFebruary(+inputMonth.value);

  try {
    if (
      (monthHas30Days && +inputDay.value > 30) ||
      (monthIsFebruary && +inputDay.value > (dateIsLeapYear ? 29 : 28))
    )
      throw new Error(`Must be a valid date`);
  } catch (err) {
    renderError(inputDay, err);
    throw err;
  }
}

async function checkDateValidity() {
  const dateStr = `${+inputYear.value}/${+inputMonth.value}/${+inputDay.value}`;

  try {
    if (dateStr > currentDateStr) throw new Error(`Must be in the past!`);
  } catch (err) {
    renderError(inputYear, err);
    throw err;
  }
}

async function checkFormValidity() {
  try {
    await Promise.all([...inputs].map(checkValidity));
    await checkYearValidity();
    await checkDayValidity();
    await checkDateValidity();
  } catch (err) {
    throw err;
  }
}

async function calculateAge() {
  let previousMonth = currentMonth - 1;
  let dayOffset = 31;
  const monthOffset = 12;

  checkMonthHas30Days(previousMonth.toString());
  checkMonthIsFebruary(previousMonth);
  checkLeapYear(currentYear);

  if (monthHas30Days) dayOffset = 30;
  if (monthIsFebruary) dayOffset = dateIsLeapYear ? 29 : 28;

  calcDays = currentDay - +inputDay.value;
  calcMonths = currentMonth - +inputMonth.value;
  calcYears = currentYear - +inputYear.value;

  if (calcDays < 0) {
    calcMonths -= 1;
    calcDays += dayOffset;
  }
  if (calcMonths < 0) {
    calcYears -= 1;
    calcMonths += monthOffset;
  }
}

ageCalculator.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    await checkFormValidity();
    await calculateAge();
    console.log("success");
  } catch (err) {
    console.log(err);
  }
});
