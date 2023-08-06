"use strict";

const ageCalculator = document.querySelector(".age-calculator__form");
const inputs = ageCalculator.querySelectorAll("input");
const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");

const resultYears = document.querySelector(".result--years");
const resultMonths = document.querySelector(".result--months");
const resultDays = document.querySelector(".result--days");
const resultsNotifier = document.querySelector(".results__notifier");

const monthsWith30Days = [4, 6, 9, 11];
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

class App {
  #dateIsLeapYear;
  #monthHas30Days;
  #monthIsFebruary;
  #calcDays = 0;
  #calcMonths = 0;
  #calcYears = 0;

  constructor() {
    ageCalculator.addEventListener("submit", this._newAge.bind(this));
  }

  _renderError(el, err) {
    el.parentNode.classList.add("error-active");
    el.setAttribute("aria-invalid", true);
    el.parentNode.querySelector(".error").textContent = err.message;
  }

  _clearError(el) {
    el.parentNode.classList.remove("error-active");
    el.removeAttribute("aria-invalid");
    el.parentNode.querySelector(".error").textContent = "";
  }

  _checkLeapYear(year) {
    this.#dateIsLeapYear = year % 4 === 0 ? true : false;
  }

  _checkMonthHas30Days(month) {
    this.#monthHas30Days = monthsWith30Days.some((monthwith30Days) =>
      month.includes(monthwith30Days)
    )
      ? true
      : false;
  }

  _checkMonthIsFebruary(month) {
    this.#monthIsFebruary = month === 2 ? true : false;
  }

  async _checkValidity(entry) {
    try {
      if (entry.validity.valid) this._clearError(entry);
      if (entry.validity.valueMissing)
        throw new Error(`This field is required`);
      if (entry.validity.patternMismatch)
        throw new Error(`Must be a valid ${entry.id}`);
    } catch (err) {
      this._renderError(entry, err);
      throw err;
    }
  }

  async _checkYearValidity() {
    try {
      if (+inputYear.value > currentYear)
        throw new Error("Must be past or present year!");
    } catch (err) {
      this._renderError(inputYear, err);
      throw err;
    }
  }

  async _checkDayValidity() {
    this._checkLeapYear(+inputYear.value);
    this._checkMonthHas30Days(inputMonth.value);
    this._checkMonthIsFebruary(+inputMonth.value);

    try {
      if (
        (this.#monthHas30Days && +inputDay.value > 30) ||
        (this.#monthIsFebruary &&
          +inputDay.value > (this.#dateIsLeapYear ? 29 : 28))
      )
        throw new Error(`Must be a valid date`);
    } catch (err) {
      this._renderError(inputDay, err);
      throw err;
    }
  }

  async _checkDateValidity() {
    const inputDate = `${+inputYear.value}/${+inputMonth.value}/${+inputDay.value}`;
    const inputDateTime = new Date(inputDate).getTime();
    const dateDiff = new Date().getTime() - inputDateTime;

    try {
      if (dateDiff < 0) throw new Error(`Must be in the past!`);
    } catch (err) {
      this._renderError(inputYear, err);
      throw err;
    }
  }

  async _checkFormValidity() {
    try {
      await Promise.all([...inputs].map(this._checkValidity.bind(this)));
      await this._checkYearValidity();
      await this._checkDayValidity();
      await this._checkDateValidity();
    } catch (err) {
      throw err;
    }
  }

  async _calculateAge() {
    let previousMonth = currentMonth - 1;
    let dayOffset = 31;
    const monthOffset = 12;
    this.#calcDays = currentDay - +inputDay.value;
    this.#calcMonths = currentMonth - +inputMonth.value;
    this.#calcYears = currentYear - +inputYear.value;

    this._checkMonthHas30Days(previousMonth.toString());
    this._checkMonthIsFebruary(previousMonth);
    this._checkLeapYear(currentYear);

    if (this.#monthHas30Days) dayOffset = 30;
    if (this.#monthIsFebruary) dayOffset = this.#dateIsLeapYear ? 29 : 28;

    if (this.#calcDays < 0) {
      this.#calcMonths -= 1;
      this.#calcDays += dayOffset;
    }

    if (this.#calcMonths < 0) {
      this.#calcYears -= 1;
      this.#calcMonths += monthOffset;
    }
  }

  _increaseElementNumber(i, el, endNumber) {
    let speed = 30;
    if (endNumber >= 100 && endNumber <= 999) speed = 10;
    if (endNumber >= 1000) speed = 1;

    if (i <= endNumber) {
      el.textContent = i;
      setTimeout(() => {
        this._increaseElementNumber(i + 1, el, endNumber);
      }, speed);
    }
  }

  _renderAge() {
    this._increaseElementNumber(0, resultYears, this.#calcYears);
    this._increaseElementNumber(0, resultMonths, this.#calcMonths);
    this._increaseElementNumber(0, resultDays, this.#calcDays);
    resultsNotifier.textContent = `Calculated age is ${this.#calcYears} years,
    ${this.#calcMonths} months, and ${this.#calcDays} days`;
  }

  async _newAge(e) {
    try {
      e.preventDefault();
      await this._checkFormValidity();
      await this._calculateAge();
      this._renderAge();
    } catch (err) {
      console.log(err);
    }
  }
}

const app = new App();
