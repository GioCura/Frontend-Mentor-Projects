import * as model from "./model.js";
import UserView from "./Views/userView.js";
import SearchView from "./Views/searchView.js";
import { DEFAULT_USER } from "./config.js";

const controlUser = async function (query) {
  try {
    if (!query) query = SearchView.getQuery();
    if (!query) return;
    UserView.renderLoader();
    await model.loadUser(query);
    UserView.render(model.state.user);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  SearchView.addHandlerGetUser(controlUser);
  controlUser(DEFAULT_USER);
};

init();
