export default class View {
  _clear() {
    this._parentElement.innerHTML = "";
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderLoader() {
    const markup = `<span class="loader"></span>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderErrorIcon() {
    const markup = `<span class="error-icon"></span>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
