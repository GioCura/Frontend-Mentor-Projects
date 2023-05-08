const portrait = document.querySelectorAll(".portrait");
const testimonial = document.querySelectorAll(".testimonial");

let slideIndex = 1;
showSlides(slideIndex);

// Slider Controls

const sliderPrev = document.querySelector(".slider__prev");
const sliderNext = document.querySelector(".slider__next");

function moveSlide(n) {
  showSlides((slideIndex += n));
}

sliderPrev.addEventListener("click", function () {
  moveSlide(-1);
});

sliderNext.addEventListener("click", function () {
  moveSlide(1);
});

function showSlides(n) {
  if (n > portrait.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = portrait.length;
  }

  for (let i = 0; i < portrait.length; i++) {
    portrait[i].classList.remove("active");
    testimonial[i].classList.remove("active");
  }

  portrait[slideIndex - 1].classList.add("active");
  testimonial[slideIndex - 1].classList.add("active");
}
