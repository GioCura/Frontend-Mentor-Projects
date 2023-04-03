const cardButtonEl = document.querySelector(".card__button");
const cardBottomEl = document.querySelector(".card__bottom");

cardButtonEl.addEventListener("click", function () {
  cardBottomEl.classList.toggle("card__bottom--socmed-show");
});
