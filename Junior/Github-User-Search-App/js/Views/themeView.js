import View from "./view.js";

class ThemeView extends View {
  _parentElement = document.querySelector(".theme");
  useDark = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeState = false;

  toggleDarkMode(state) {
    document.documentElement.classList.toggle("darkmode", state);
    this.darkModeState = state;
    // console.log(this.darkModeState);
  }

  setDarkModeLocalStorage(state) {
    localStorage.setItem("darkmode", state);
  }

  addHandler;
}

export default new ThemeView();
