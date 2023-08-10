import { AJAX } from "./helpers.js";
import { API__URL } from "./config.js";

export const state = {
  user: {
    avatarUrl: "",
    name: "",
    regDate: "",
    userName: "",
    bio: "",
    repos: "",
    followers: "",
    following: "",
    location: "",
    twitter: "",
    blog: "",
    company: "",
  },
  darkMode: "",
};

const createUserObject = function (data) {
  return {
    avatarUrl: data.avatar_url,
    name: data.name,
    regDate: data.created_at,
    userName: data.login,
    bio: data.bio,
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    location: data.location,
    twitter: data.twitter_username,
    blog: data.blog,
    company: data.company,
  };
};

export const loadUser = async function (username) {
  try {
    const data = await AJAX(`${API__URL}${username}`);
    // console.log(data);
    state.user = createUserObject(data);
    // console.log(state.user);
    return data;
  } catch (err) {
    throw err;
  }
};

export const setDarkModeLocalStorage = function (status) {
  localStorage.setItem("dark-mode", status);
  state.darkMode = status;
  console.log(state.darkMode);
};

const init = function () {
  const storage = localStorage.getItem("dark-mode");
  if (storage) state.darkMode = storage;
};

init();
