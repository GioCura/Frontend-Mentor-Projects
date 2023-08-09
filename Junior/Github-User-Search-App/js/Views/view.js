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

  // to do
  renderError() {
    const markup = ``;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // to do
  renderClearBtn() {
    const markup = ``;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
