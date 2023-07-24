# Frontend Mentor - Advice generator app solution

This is a solution to the [Advice generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/advice-generator-app-QdUG-13db).

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

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Generate a new piece of advice by clicking the dice icon

### Screenshot

![Screenshot - Desktop](/images/screenshot-desktop.png)

### Links

- [Live Site](https://gc35-advice-generator.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JS

### What I learned

I learned how to use API's through this project. I now know that it starts with fetching the API url, returning its response, and thereafter using `.then` to script what should happen next. Through the tutorial I watched, I learned to capture the response's data through `slip`. Looking at it from the console, I can see the names of each piece of data.

Additionally, I learned how to add loaders. It first involves styling a loader class with the appropriate gif, svg, etc. For this project, the loader is written into the `innerHTML` upon the click of the dice button. After that, the fetch action is done, and that changes the `innerHTML` to the requested data.

I also found out that fetching new advice didn't work right away on Firefox unless you add `{ cache: "no-cache" }` to the fetch parameters.

///////////////
UPDATE 07/24/23

After finishing Jonas Schmedtmann's JavaScript course, I went back and refactored my code to reflect the MVC model. Although this requires splitting the script into multiple files, hopefully this code is more organized, reusable, and easier to update. I've alsoimplemented try catch statements and guard clauses for the first time.

### Continued development

- I'd like more practice using API's.
- I'd like more practice implementing the MVC model.

### Useful resources

- [This video by Oston Code Cypher](https://youtu.be/2AfzKmgqWUE) helped me understand how to integrate the API into my code.
- [Shishir Arora's answer to this question](https://stackoverflow.com/questions/53799108/how-to-add-a-loading-animation-while-fetch-data-from-api-vanilla-js) helped me understand how loaders are implemented.
- [This site](https://loading.io/) is where I got my custom loader from.

## Author

- Frontend Mentor - [@GioCura](https://www.frontendmentor.io/profile/GioCura)

## Acknowledgments

- I'd like to thank [@Elaine's answer to this solution](https://www.frontendmentor.io/solutions/advice-generator-app-GsPyd2XsS8) about how to make the API work for Firefox.
