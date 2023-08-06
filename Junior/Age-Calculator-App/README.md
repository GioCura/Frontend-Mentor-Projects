# Frontend Mentor - Age Calculator App Solution

This is a solution to the [age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/advice-generator-app-QdUG-13db).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![Screenshot - Desktop](../assets/images/screenshot.png)

### Links

- [Live Site](https://gc36-age-calculator.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JS

### What I learned

I took on this challenge to practice programming apps under a class structure. At the time of making this, I've just finished Jonas Schmedtmann's JavaScript course.

To check if the input month has 30 days, I learned the `.some()` array method. I use it to check the user's input with an array containing the months that have 30 days:

```
  _checkMonthHas30Days(el) {
    this.#monthHas30Days = monthsWith30Days.some((month) => el.includes(month))
      ? true
      : false;
  }
```

For checking leap years, I made a function that checks whether the input number is disible by 4. I used modulus:

```
  _checkLeapYear(year) {
    this.#dateIsLeapYear = year % 4 === 0 ? true : false;
  }
```

To check whether the input Date is in the future, I learned the `.getTime()` method. I use it to get the input and current dates in milliseconds. Then, I check the difference between the two:

```
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
```

I wrote the form validation as a sequence of asynchronous functions in a try-catch block. Since I wanted to use a single function in the first stage to validate three values (year, month, day), I ran into the problem of one function call error preventing the other calls' errors from triggering.

To solve this problem, I learned about using `Promise.all()` together with `.map()`. `.map()` assigns the function to each input collected in an array. `Promise.all()` lets each function finish before returning a single promise:

```
await Promise.all([...inputs].map(this._checkValidity.bind(this)));
```

To animate the number increase after the age has been calculated, I learned about recursive functions. This is a function that loops itself until a condition has been met.

I used setTimeout to make my function recursive:

```
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
```

In the above `setTimeout`, note that the looped function is nested in an arrow function. This is for two purposes. First, calling the arrow before the looped function creates the desired increasing number effect. Second, if the function was not an arrow, the `this` would be redefined to the function's inner scope. Writing it in as an arrow ensures that the `this` is set to the class scope.

Because of the class structure, I had to deal with avoiding the rebind of `this` in other instances. I used the `.bind()` method:

```
constructor() {
  ageCalculator.addEventListener("submit", this._newAge.bind(this));
}

await Promise.all([...inputs].map(this._checkValidity.bind(this)));
```

### Continued development

- I'd like more practice making javascript classes.
- I'd like to take on more complicated apps, involving APIs.

### Useful resources

- [This article](https://www.cuemath.com/calculators/age-calculator/) is the basis of my age calculation.
- [This SO thread](https://stackoverflow.com/questions/37428338/check-if-a-string-contains-any-element-of-an-array-in-javascript) helped me understand how to use the `.some()` method.
- [mabdullahse's answer in this thread](https://stackoverflow.com/questions/8305259/check-if-date-is-in-the-past-javascript) is the basis for my function that checks whether the date is in the future.
- [Andy E's answer in this thread](https://stackoverflow.com/questions/2821006/find-if-variable-is-divisible-by-2) taught me about modulus.
- [maxspiri's solution in this thread](https://stackoverflow.com/questions/73684496/how-to-call-async-await-api-calls-inside-foreach-loop) is where I learned about using `Promise.all()` and `.map()` together.
- [Jacob Duvander's](https://codepen.io/duvander/pen/KXOpXw) codepen is the basis for my number increase function.

## Author

- Frontend Mentor - [@GioCura](https://www.frontendmentor.io/profile/GioCura)
