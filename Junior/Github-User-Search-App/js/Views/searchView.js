import View from "./view.js";

class SearchView extends View {
  _parentElement = document.querySelector(".searchbar form");

  getQuery() {
    const query = this._parentElement.querySelector(".searchbar input").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".searchbar input").value = "";
  }

  addHandlerGetUser(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
