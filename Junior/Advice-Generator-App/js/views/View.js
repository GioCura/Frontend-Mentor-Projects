export default class View {
  clear(el) {
    el.textContent = "";
  }

  renderLoader = function () {
    const markup = `<span class="loading"></span>`;
    this._messageContainer.innerHTML = markup;
  };

  renderError = function (message) {
    this._messageContainer.textContent = `${message}`;
  };
}
