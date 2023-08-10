import View from "./view.js";

class ThemeView extends View {
  _parentElement = document.querySelector(".theme");
  defaultTheme = false;
  prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  toggleDarkMode(state) {
    this.defaultTheme = state;
    document.documentElement.classList.toggle("dark-mode", state);
  }

  addHandlerCheckSettingsChange() {
    this.prefersDark.addEventListener("change", (evt) =>
      this.toggleDarkMode(evt.matches)
    );
  }

  addHandlerChangeTheme(handler) {
    this._parentElement.addEventListener("click", handler);
  }
}

export default new ThemeView();
