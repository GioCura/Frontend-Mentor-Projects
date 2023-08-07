export default class View {
  clear(el) {
    el.textContent = "";
  }

  renderLoader() {
    const markup = `<span class="loading"></span>`;
    this._messageContainer.innerHTML = markup;
  }

  renderError(message) {
    this._messageContainer.textContent = `${message}`;
  }
}
