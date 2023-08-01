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

let dateIsLeapYear;
let monthHas30Days;
let monthIsFebruary;

let calcDays = 0;
let calcMonths = 0;
let calcYears = 0;

function renderError(el, err) {
  el.parentNode.classList.add("error-active");
  el.parentNode.querySelector(".error").textContent = err.message;
}

function clearError(el) {
  el.parentNode.classList.remove("error-active");
  el.parentNode.querySelector(".error").textContent = "";
}

function checkLeapYear(year) {
  dateIsLeapYear = year % 4 === 0 ? true : false;
}

function checkMonthHas30Days(el) {
  if (monthsWith30Days.some((month) => el.includes(month))) {
    monthHas30Days = true;
  } else {
    monthHas30Days = false;
  }
}

function checkMonthIsFebruary(month) {
  if (month === 2) {
    monthIsFebruary = true;
  } else {
    monthIsFebruary = false;
  }
}

async function checkValidity(entry) {
  try {
    if (entry.validity.valid) clearError(entry);
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
  const inputDate = `${+inputYear.value}/${+inputMonth.value}/${+inputDay.value}`;
  const inputDateTime = new Date(inputDate).getTime();
  const dateDiff = new Date().getTime() - inputDateTime;

  console.log(dateDiff);

  try {
    if (dateDiff < 0) throw new Error(`Must be in the past!`);
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
  calcDays = currentDay - +inputDay.value;
  calcMonths = currentMonth - +inputMonth.value;
  calcYears = currentYear - +inputYear.value;

  checkMonthHas30Days(previousMonth.toString());
  checkMonthIsFebruary(previousMonth);
  checkLeapYear(currentYear);

  if (monthHas30Days) dayOffset = 30;
  if (monthIsFebruary) dayOffset = dateIsLeapYear ? 29 : 28;

  if (calcDays < 0) {
    calcMonths -= 1;
    calcDays += dayOffset;
  }
  if (calcMonths < 0) {
    calcYears -= 1;
    calcMonths += monthOffset;
  }
}

function renderAge() {
  document.querySelector(".result--years").textContent = calcYears;
  document.querySelector(".result--months").textContent = calcMonths;
  document.querySelector(".result--days").textContent = calcDays;
}

ageCalculator.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    await checkFormValidity();
    await calculateAge();
    renderAge();
    console.log("success");
  } catch (err) {
    console.log(err);
  }
});
