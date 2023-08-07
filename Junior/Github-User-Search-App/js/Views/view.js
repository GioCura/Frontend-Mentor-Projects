export default class View {
  clear(el) {
    el.textContent = "";
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
