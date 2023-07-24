"use strict";

import * as model from "./model.js";
import adviceView from "./views/adviceView.js";

const controlAdvice = async function () {
  try {
    if (adviceView._buttonIsDisabled) return;
    adviceView.renderLoader();
    adviceView._buttonSpin();
    adviceView._setFetchingState();
    await model.loadAdvice();
    adviceView._renderAdvice(model.state.advice);
    adviceView._setReadyState(model.state.advice);
  } catch (err) {
    adviceView.renderError(err);
    adviceView._setReadyState(model.state.advice);
  }
};

const init = function () {
  adviceView.addHandlerNewAdvice(controlAdvice);
  controlAdvice();
};

init();
