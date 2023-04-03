# Frontend Mentor - Huddle landing page with single introductory section solution

This is a solution to the [Huddle landing page with single introductory section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/huddle-landing-page-with-a-single-introductory-section-B_2Wvxgi0).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the page depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshot

![Desktop version](images/screenshot-desktop.png)
![Tablet version](images/screenshot-tablet.png)
![Mobile version](images/screenshot-mobile.png)

### Links

- [Live site](https://gc14-huddle-landing.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Fluid typography

### What I learned

- After doing 9 card components on Frontendmentor, I was eager to do landing pages.

- The most time-consuming task for this project was making it responsive. Here, I tried making responsive and fluid vertical margins. I fiddled around with clamp and viewport units, but it was a hassle dealing with both width and height changes. The most convenient way, I found, was to use `justify-content: space-between` along with setting a viewport height.

- I tended to avoid using space-between because I want custom margin spacings. But, I learned that both complement each other. Since I use a mobile-first workflow, the `space-between` effect kicks in when the viewport gets higher than my starting point.

- I'm getting more comfortable using `clamp()`. I find that it's easier to implenet after putting set `rem` sizes on both mobile and desktop version. That way, I know my `min` and my `max` values. After that, I'll go to my desktop version and get the `val` by fiddling around with the percent until the size matches my max value.

- This project also took some time because I took a bit of creative liberty with the layout for the sake of making it responsive. In the first place, the mobile mockup given was in 750x1600, which is not mobile to me at all.

- I developed a process for doing pages like these:
  1. Start from the mobile mockup.
  2. Do the desktop mockup.
  3. Figure out a good breakpoint for the tablet versions.
  4. Make a tablet design based on Surface Pro 7 vertical.
  5. From the mobile mockup, make the fluid sizing (`clamp` or whatever)
  6. Find the breakpoint for the desktop version.
  7. From the tablet version, make the fluid sizing to the desktop.

### Useful resources

- [This blog post](https://blog.bitsrc.io/css-clamp-the-responsive-combination-weve-all-been-waiting-for-f1ce1981ea6e) really helped me understand the concept of clamp.

## Author

- Frontendmentor - [@GioCura](https://www.frontendmentor.io/profile/GioCura)

## Acknowledgments

Thanks to Zellene for always keeping me sane.
