const portrait = document.querySelectorAll(".portrait");
const testimonialParent = document.querySelector(".testimonials");
const testimonial = document.querySelectorAll(".testimonial");
const slider = document.querySelector(".slider");
const sliderPrev = document.querySelector(".slider__prev");
const sliderNext = document.querySelector(".slider__next");
const testimonialResize = new ResizeObserver(function (entries) {
  let rect = entries[0].contentRect;
  let height = rect.height;
  testimonialParent.style.height = height + "px";
});

testimonialResize.observe(document.querySelector(".testimonial--john"));

let slideIndex = 1;
// showSlides(slideIndex);

// Slider Controls

function moveSlide(n) {
  showSlides((slideIndex += n));
}

sliderPrev.addEventListener("click", function () {
  moveSlide(-1);
});

sliderNext.addEventListener("click", function () {
  moveSlide(1);
});

slider.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === "ArrowRight") {
    sliderNext.click();
  } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
    sliderPrev.click();
  }
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
