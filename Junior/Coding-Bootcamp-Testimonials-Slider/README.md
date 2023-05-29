# Frontend Mentor - Coding bootcamp testimonials slider solution

This is a solution to the [Coding bootcamp testimonials slider challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/coding-bootcamp-testimonials-slider-4FNyLA8JL).

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
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the component depending on their device's screen size
- Navigate the slider using either their mouse/trackpad or keyboard

### Screenshot

Desktop
![Desktop](images/screenshot-desktop.png)
Desktop-2
![Desktop-2](images/screenshot-desktop-2.png)
Mobile
![Mobile](images/screenshot-mobile.png)

### Links

- [Live Site](https://gc30-testimonials-slider.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JS
- Mobile-first workflow

### What I learned

The slider, to me, is like a more complex toggle switch. Sliders must accommodate for more than two states.

The slider I made relies on an index number, which to an item in the slider. 1 refers to the first slide, 2 for the second, etc:

```
let slideIndex = 1;
```

Its value is modified by interacting with the slider arrows:

```
function moveSlide(n) {
  showSlides((slideIndex += n));
}

sliderPrev.addEventListener("click", function () {
  moveSlide(-1);
});

sliderNext.addEventListener("click", function () {
  moveSlide(1);
});
```

The main function for the slider initially checks that index number.

Of course, the slider must restart from 1 when the user tries to click next on the final slide, and vice versa:

```
  if (n > portrait.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = portrait.length;
  }
```

The function then adds an active class to the slide with the corresponding index. However, since the variable being used to call the slides returns a nodeList, the list starts off from 0 instead of 1. I must then subtract 1 to the index:

```
  for (let i = 0; i < portrait.length; i++) {
    portrait[i].classList.remove("active");
    testimonial[i].classList.remove("active");
  }
```

The function also loops around the rest of the nodeList to remove the active class:

```
  for (let i = 0; i < portrait.length; i++) {
    portrait[i].classList.remove("active");
    testimonial[i].classList.remove("active");
  }
```

Update 05/29/2023 -> I added some accesibility features:

- My script now controls the `aria-hidden` values of the testimonials, so that the screen reader will only read the ones on screen.
- Also, I added alerts for when the slider buttons are pressed. This time, I learned how to style an alert element only visible to screen readers:

```
<div id="slider__notifier" role="alert" class="slider__notifier"></div>
```

```
.slider__notifier {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

- Upon click, the script adds the appropriate message to the slider. I made a `setTimeout` to remove the message quickly after, so that the screenreader
  is repeatedly made to read the message every button click:

```
let resetSlider = () =>
  setTimeout(function () {
    sliderNotifier.textContent = "";
  }, 100);
```

- Also, I learned to add a `role` to a `<div>` so that an `aria-label` will be valid.

### Continued development

I'd like to do more sliders with different components, such as captions and thumbnails.

### Useful resources

- [This w3schools tutorial](https://www.w3schools.com/howto/howto_js_slideshow.asp) is what I mostly based my code off of.

## Author

- [@GioCura](https://www.frontendmentor.io/profile/GioCura)

## Acknowledgments

Thanks to Zellene for helping check the site on Safari.
