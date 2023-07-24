import { FETCH_TIMEOUT } from "./config.js";

const timeout = function (time) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Advice took too long to load! Please try again.`));
    }, time);
  });
};

export const AJAX = async function (url) {
  try {
    const fetchPro = fetch(url, { cache: "no-cache" });
    const res = await Promise.race([fetchPro, timeout(FETCH_TIMEOUT)]);
    if (!res.ok)
      throw new Error(`Problem getting advice! Error code ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
