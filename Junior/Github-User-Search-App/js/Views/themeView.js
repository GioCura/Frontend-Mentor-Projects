import View from "./view.js";
import { markupDark, markupLight } from "../config.js";

class ThemeView extends View {
  _parentElement = document.querySelector(".theme");
  defaultTheme = false;
  prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  toggleDarkMode(state) {
    this.defaultTheme = state;
    const themeNotification = `theme set to ${
      state === true ? `dark` : `light`
    } mode`;
    document.documentElement.classList.toggle("dark-mode", state);
    this._parentElement.innerHTML = state === true ? markupDark : markupLight;
    this._parentElement.setAttribute("aria-label", themeNotification);
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
