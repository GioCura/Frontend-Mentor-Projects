"use strict";

import * as model from "./model.js";
import View from "./views/View.js";

const controlAdvice = async function () {
  try {
    if (View._buttonIsDisabled) return;
    View._buttonSpin();
    View._renderLoader();
    View._setFetchingState();
    await model.loadAdvice();
    View._renderAdvice(model.state.advice);
    View._setReadyState(model.state.advice);
  } catch (err) {
    View._renderError(err);
    View._setReadyState(model.state.advice);
  }
};

const init = function () {
  View.addHandlerNewAdvice(controlAdvice);
  controlAdvice();
};

init();
