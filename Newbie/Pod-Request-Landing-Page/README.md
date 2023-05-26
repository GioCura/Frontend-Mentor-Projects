# Frontend Mentor - Pod request access landing page solution

This is a solution to the [Pod request access landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pod-request-access-landing-page-eyTmdkLSG).

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

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Receive an error message when the form is submitted if:
  - The `Email address` field is empty should show "Oops! Please add your email"
  - The email is not formatted correctly should show "Oops! Please check your email"

### Screenshot

![](./screenshot.jpg)

### Links

- [Live site](https://gc32-pod-landing.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JS
- Mobile-first workflow

### What I learned

I took this on because the layout seemed unique, stylish, and challenging.

I brushed up on some concepts I've learned previously to make it. Like, how to use a pseudoelement to achieve the transparent background on mobile. I also had to make an input that houses a button for the desktop layout.

Last time, I nested the input and button under a `<div>`, and let the latter have the background color and border-radius.

However, I realized that tab-focusing on the input when it's styled like this doesn't outline the whole thing. This time, taking inspiration from [Vanza Setia's solution this challenge](https://officialpod.netlify.app/), I let the `<div>` have the `width`, but let the input keep the background color and border-radius. Also, the button is absolutely positioned relative to the `<div>`. The input then has `width: 100`. To make sure that the text written into the input doesn't overlap the button, the input is given a large padding to the right.

A major thing that I've learned and practiced here is to make the site accessible for screen readers. Firsty, the screen reader needs to know what the input is about upon highlighting it. This can be done via `aria-label`:

```
<input
  aria-label="Enter email address here"
/>
```

When there's an `aria-label`, the screen reader ignores the `placeholder`.

Next, the reader should be informed if the form is invalid. For custom form validations, you can do it yourself by setting the input's `aria-invalid` value via `setAttribute`:

```
function emailError() {
  ctaInput.setAttribute("aria-invalid", "true");
}
```

Which you can then remove if the input is valid:

```
ctaInput.addEventListener("change", function () {
  if (ctaInput.validity.valid) {
    ctaInput.removeAttribute("aria-invalid");
  } else {
    emailError();
  }
});
```

It also helps if the screen reader is made to read the error message. This can be done by using `aria-describedby`, which refers to the error message's id:

```
<input
  aria-describedby="ctaError"
/>
<span class="cta__error" id="ctaError" aria-live="polite"></span>
```

When the script confirms that the input is invalid, the error message is written into the `<span>`.
With `aria-live` set to `polite` the screen reader reads the message.

In my code, it is crucial to remove the text content of the error upon validation, so that the reader won't detect it. I learned that, in general, adding `aria-hidden="true"` does the same trick. However, since the input is described by the error, it overlooks `aria-hidden`.

### Continued development

I'll go back to my previous projects to ensure accessiblity.

I also want to go back and convert my media query values from `px` to `em`, as I learned that it's generally better. It's as simple as dividing the pixel values to 16.

### Useful resources

- [This guide](https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/) taught me about making form validation accessible, particulary through `aria-invalid`, `aria-describedby`, and `aria-live`.

## Author

- [@GioCura](https://www.frontendmentor.io/profile/GioCura)

## Acknowledgments

Many thanks to [Vanza Setia's solution this challenge](https://officialpod.netlify.app/). I re-styled my desktop layout's input and button according to his, since it looks better when tab-focused. Also, I learn a bit about accesibility by looking at his code.
