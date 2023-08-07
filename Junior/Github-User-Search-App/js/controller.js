import * as model from "./model.js";
import UserView from "./Views/userView.js";

const controlUser = async function () {
  try {
    await model.loadUser();
    UserView.render(model.state.user);
  } catch (err) {
    console.log(err);
  }
};

controlUser();
