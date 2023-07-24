import { AJAX } from "./helpers.js";
import { API__URL } from "./config.js";

export const state = {
  advice: {},
};

const createAdviceObject = function (data) {
  const advice = data.slip;
  return {
    id: advice.id,
    advice: advice.advice,
  };
};

export const loadAdvice = async function () {
  try {
    const data = await AJAX(API__URL);
    state.advice = createAdviceObject(data);
    return data;
  } catch (err) {
    throw err;
  }
};
