import * as model from "./model.js";
import UserView from "./Views/userView.js";
import SearchView from "./Views/searchView.js";
import ThemeView from "./Views/themeView.js";
import { DEFAULT_USER } from "./config.js";

const controlGetUser = async function (query) {
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

const controlChangeTheme = function () {
  ThemeView.defaultTheme = !ThemeView.defaultTheme;
  ThemeView.toggleDarkMode(ThemeView.defaultTheme);
  model.setDarkModeLocalStorage(ThemeView.defaultTheme);
};

const init = function () {
  ThemeView.addHandlerCheckSettingsChange();
  ThemeView.addHandlerChangeTheme(controlChangeTheme);
  ThemeView.toggleDarkMode(
    model.state.darkMode
      ? model.state.darkMode == "true"
      : ThemeView.prefersDark.matches
  );
  SearchView.addHandlerGetUser(controlGetUser);
  controlGetUser(DEFAULT_USER);
};

init();
