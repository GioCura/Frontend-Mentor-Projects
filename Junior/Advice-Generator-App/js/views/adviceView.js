import View from "./View.js";
import { NOTIFIER_TIMEOUT } from "../config.js";
import { READYSTATE_TIMEOUT } from "../config.js";

class AdviceView extends View {
  _parentElement = document.querySelector(".advice-generator");
  _messageContainer = document.querySelector(".advice");

  _title = document.querySelector(".advice-generator h2");
  _id = document.querySelector(".advice__id");
  _btn = document.querySelector(".advice__btn");
  _notifier = document.querySelector(".notifier");
  buttonIsDisabled = false;

  _clearNotifier() {
    setTimeout(() => {
      this.clear(this._notifier);
    }, NOTIFIER_TIMEOUT);
  }

  buttonSpin() {
    this._btn.style.animation = "0.5s spin ease-out";

    this._btn.addEventListener("animationend", function () {
      this.style.animation = "none";
    });
  }

  setReadyState(obj) {
    setTimeout(() => {
      this.buttonIsDisabled = false;
      this._notifier.textContent = `Now showing advice number ${obj.id}`;
      this._btn.classList.remove("disabled");
      this._clearNotifier();
    }, READYSTATE_TIMEOUT);
  }

  setFetchingState() {
    this.buttonIsDisabled = true;
    this._title.style.display = "none";
    this._notifier.textContent = "Getting new advice";
    this._btn.classList.add("disabled");
  }

  renderAdvice(data) {
    this._title.style.display = "block";
    this._id.textContent = data.id;
    this._messageContainer.innerHTML = `“${data.advice}”`;
  }

  addHandlerNewAdvice(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".advice__btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new AdviceView();
