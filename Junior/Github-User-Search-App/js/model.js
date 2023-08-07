import { AJAX } from "./helpers.js";
import { API__URL } from "./config.js";

export const state = {
  user: {
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
};

const convertDate = function (rawDate) {
  const date = new Date(rawDate);
  const dateStr = `${date.getDate()} ${date
    .toString()
    .slice(4, 7)} ${date.getFullYear()}`;
  return dateStr;
};

const createUserObject = function (data) {
  return {
    name: data.name,
    regDate: convertDate(data.created_at),
    userName: `@${data.login}`,
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

export const loadUser = async function () {
  try {
    const data = await AJAX(API__URL);
    console.log(data);
    state.user = createUserObject(data);
    console.log(state.user);
    return data;
  } catch (err) {
    throw err;
  }
};
