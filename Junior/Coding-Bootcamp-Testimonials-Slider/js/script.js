const imageBox = document.querySelector(".imagebox");
const testimonials = document.querySelector(".testimonials");
const portrait = document.querySelectorAll(".portrait");
const testimonial = document.querySelectorAll(".testimonial");
const slider = document.querySelector(".slider");
const sliderPrev = document.querySelector(".slider__btn--prev");
const sliderNext = document.querySelector(".slider__btn--next");
const sliderNotifier = document.querySelector(".slider__notifier");

window.addEventListener("load", function () {
  imageBox.classList.remove("hidden-right");
  testimonials.classList.remove("hidden-left");

  imageBox.addEventListener("transitionend", function () {
    document.body.classList.remove("overflow");
  });
});

let slideIndex = 1;

//  Resets the slider alert's message, for repeatable alerts on click.
let resetSlider = () =>
  setTimeout(function () {
    sliderNotifier.textContent = "";
  }, 100);

// Slider Controls
function moveSlide(n) {
  showSlides((slideIndex += n));
}
sliderPrev.addEventListener("click", function () {
  moveSlide(-1);
  sliderNotifier.textContent = "moving to previous slide";
  resetSlider();
});

sliderNext.addEventListener("click", function () {
  moveSlide(1);
  sliderNotifier.textContent = "moving to next slide";
  resetSlider();
});

// Resets the notifier's alert message
slider.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === "ArrowRight" || e.key === " ") {
    sliderNext.click();
  } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
    sliderPrev.click();
  }
});

// Shows the corresponding slide

function showSlides(n) {
  if (n > portrait.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = portrait.length;
  }

  for (let i = 0; i < portrait.length; i++) {
    portrait[i].classList.remove("active");
    portrait[i].ariaHidden = "true";
    testimonial[i].classList.remove("active");
    testimonial[i].ariaHidden = "true";
  }

  portrait[slideIndex - 1].classList.add("active");
  portrait[slideIndex - 1].removeAttribute("aria-hidden");
  testimonial[slideIndex - 1].classList.add("active");
  testimonial[slideIndex - 1].removeAttribute("aria-hidden");
}
