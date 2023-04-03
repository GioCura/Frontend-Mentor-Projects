# Frontend Mentor - Intro component with sign up form solution

This is a solution to the [Intro component with sign up form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-component-with-signup-form-5cf91bd49edda32581d28fd1).

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

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the `form` is submitted if:
  - Any `input` field is empty. The message for this error should say _"[Field Name] cannot be empty"_
  - The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say _"Looks like this is not an email"_

### Screenshot

Desktop
![Desktop](images/screenshot-desktop.png)
Desktop-Active
![Desktop-Active](images/screenshot-desktop-active.png)
Mobile
![Mobile](images/screenshot-mobile.png)

### Links

- [Live Site](https://gc17-intro-signup.netlify.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Vanilla JS
- Flexbox
- Mobile-first workflow

### What I learned

I took on this project because I wanted to learn basic form validation via JS.

I pretty much started with next to no knowledge about this. First thing I learned was that the project's error states were all custom elements and attributes triggered via JS.

First, I learned to add the `novalidate` property to my `form`'s tag in order to disable html's default validation.

Then, the form validation triggers via two events:

- When the user submits the form

  - On submit, if statements are made for each input's validity.
  - The validations used are the default ones:
    `(!input.validity.valid)`
    `(!input.validity.valueMissing)`
    `(!input.validity.typeMismatch)`
    `(!input.validity.tooShort)`

    - `valueMissing` checks whether nothing was input.
    - `typeMismatch` was used to check for the proper email format (as the input type was set to `email`)
    - `tooShort` was used to check if the password meets the set `minlength` (again, set in the input itself)

  - On submit, the script removes the placeholder text, as seen in the mockup.

- When the user types something into the form (before and after submitting)

  - The `change` event was observed instead of `input`, so that the alerts don't prematurely show.
  - When the input checks out as valid, the script removes the invalid class and removes the alert text.
  - Otherwise, the alert function will trigger.

Validation aside, I also learned how to insert icons inside the input fields. I wrote the images as sibligns to the input fields, set their nesting div to `position: relative`, and set the images to `position: absolute`

- ## when the user types something into each input.

### Continued development

- As with resetting margin and padding values at the top of the stylesheet, I have to remember to set `"use strict";` at the top of my script file.

- Definitely need to do more functional forms.

- I'd like to learn more complex input validation, such as password rules.

- To add to that, I'd like to learn how to make a password strength indicator.

### Useful resources

- [This mozilla article](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) served as my guide for making the form validation features.
- [This codepen by Jay Holtslander](https://codepen.io/j_holtslander/pen/Yxdqwd)helped me understand how to insert the error icon inside the input fields.

## Author

- Frontend Mentor - [@GioCura](https://www.frontendmentor.io/profile/GioCura)
