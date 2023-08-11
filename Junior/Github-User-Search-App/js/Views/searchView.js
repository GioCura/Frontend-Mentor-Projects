import View from "./view.js";

class SearchView extends View {
  _parentElement = document.querySelector(".searchbar__form");
  _errorContainer = this._parentElement.querySelector(".error-container");
  _input = this._parentElement.querySelector(".searchbar__input");

  _addAriaInvalid() {
    this._input.setAttribute("aria-invalid", true);
  }

  _removeAriaInvalid() {
    this._input.removeAttribute("aria-invalid");
  }

  getQuery() {
    const query = this._input.value;
    return query;
  }

  renderError(err) {
    const markup = `<p class="error-message" aria-live="polite">${err.message}</p>`;
    this._errorContainer.insertAdjacentHTML("afterbegin", markup);
    this._addAriaInvalid();
  }

  clearError() {
    this._errorContainer.innerHTML = "";
    this._removeAriaInvalid();
  }

  addHandlerGetUser(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
