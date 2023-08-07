import * as model from "./model.js";

const controlUser = async function () {
  try {
    await model.loadUser();
  } catch (err) {
    console.log(err);
  }
};

controlUser();
