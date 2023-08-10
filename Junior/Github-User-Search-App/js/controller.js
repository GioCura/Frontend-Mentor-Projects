import * as model from "./model.js";
import UserView from "./Views/userView.js";
import SearchView from "./Views/searchView.js";
// import ThemeView from "./Views/themeView.js";
import { DEFAULT_USER } from "./config.js";

const controlUser = async function (query) {
  try {
    if (!query) query = SearchView.getQuery();
    if (!query) return;
    SearchView.clearError();
    UserView.renderLoader();
    await model.loadUser(query);
    UserView.render(model.state.user);
  } catch (err) {
    console.log(err);
    SearchView.renderError(err);
    UserView.renderErrorIcon();
  }
};

// tentative ThemeView code
let darkModeState = false;
const useDark = window.matchMedia("(prefers-color-scheme: dark)");

function toggleDarkMode(state) {
  darkModeState = state;
  document.body.classList.toggle("dark-mode", state);
}

function setDarkModeLocalStorage(state) {
  localStorage.setItem("dark-mode", state);
  console.log(`LocalStorage ${state}`);
}

useDark.addEventListener("change", (evt) => toggleDarkMode(evt.matches));

const init = function () {
  SearchView.addHandlerGetUser(controlUser);
  controlUser(DEFAULT_USER);
  toggleDarkMode(
    localStorage.getItem("dark-mode")
      ? localStorage.getItem("dark-mode") === `true`
      : useDark.matches
  );
  document.querySelector(".theme").addEventListener("click", () => {
    darkModeState = !darkModeState;

    toggleDarkMode(darkModeState);
    setDarkModeLocalStorage(darkModeState);
  });
};

init();
