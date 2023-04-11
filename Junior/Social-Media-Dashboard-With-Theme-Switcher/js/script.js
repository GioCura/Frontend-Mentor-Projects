const darkmodeInputEl = document.querySelector(".darkmode__input");
const darkmodeToggleEl = document.querySelector(".darkmode__toggle");

function toggleTheme() {
  document.body.classList.toggle("light");
}

darkmodeToggleEl.addEventListener("keydown", (e) => {
  // prevents default spacebar scrolling
  e.preventDefault();
  if (e.key === " " || e.key === "Enter") {
    darkmodeInputEl.click();
  }
});

darkmodeInputEl.addEventListener("change", () => {
  toggleTheme();
});
