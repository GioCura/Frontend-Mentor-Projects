import { NOTIFIER_TIMEOUT } from "../config.js";
import { READYSTATE_TIMEOUT } from "../config.js";

class View {
  _parentElement = document.querySelector(".advice-generator");

  _adviceTitle = document.querySelector(".advice-generator h2");
  _adviceId = document.querySelector(".advice__id");
  _advice = document.querySelector(".advice");
  _adviceBtn = document.querySelector(".advice__btn");
  _notifier = document.querySelector(".notifier");
  _buttonIsDisabled = false;

  _clear(el) {
    el.textContent = "";
  }

  _clearNotifier() {
    setTimeout(() => {
      this._clear(this._notifier);
    }, NOTIFIER_TIMEOUT);
  }

  _buttonSpin() {
    this._adviceBtn.style.animation = "0.5s spin ease-out";

    this._adviceBtn.addEventListener("animationend", function () {
      this.style.animation = "none";
    });
  }

  _renderLoader = function () {
    this._advice.innerHTML = `<span class="loading"></span>`;
  };

  _renderError = function (message) {
    this._advice.textContent = `${message}`;
  };

  _setReadyState(obj) {
    setTimeout(() => {
      this._buttonIsDisabled = false;
      this._notifier.textContent = `Now showing advice number ${obj.id}`;
      this._adviceBtn.classList.remove("disabled");
      this._clearNotifier();
    }, READYSTATE_TIMEOUT);
  }

  _setFetchingState() {
    this._buttonIsDisabled = true;
    this._adviceTitle.style.display = "none";
    this._notifier.textContent = "Getting new advice";
    this._adviceBtn.classList.add("disabled");
  }

  _renderAdvice(data) {
    this._adviceTitle.style.display = "block";
    this._adviceId.textContent = data.id;
    this._advice.innerHTML = `“${data.advice}”`;
  }

  addHandlerNewAdvice(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".advice__btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new View();
