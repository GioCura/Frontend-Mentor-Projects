"use strict";

import * as model from "./model.js";
import adviceView from "./views/adviceView.js";

const controlAdvice = async function () {
  try {
    if (adviceView.buttonIsDisabled) return;
    adviceView.renderLoader();
    adviceView.buttonSpin();
    adviceView.setFetchingState();
    await model.loadAdvice();
    adviceView.renderAdvice(model.state.advice);
    adviceView.setReadyState(model.state.advice);
  } catch (err) {
    adviceView.renderError(err);
    adviceView.setReadyState(model.state.advice);
  }
};

const init = function () {
  adviceView.addHandlerNewAdvice(controlAdvice);
  controlAdvice();
};

init();
