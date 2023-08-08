export default class View {
  _clear() {
    this._parentElement.innerHTML = "";
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderLoader() {
    const markup = `<span class="loading"></span>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    const markup = ``;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderClearBtn() {
    const markup = ``;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
