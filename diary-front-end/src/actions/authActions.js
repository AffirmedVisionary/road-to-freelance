import fetch from "isomorphic-fetch";
import { API } from "../config/config";
import cookie from "js-cookie";

export async function register(user) {
  await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export async function login (user) {
  await fetch(`http://localhost:8000/api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export async function logout (next) {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  await fetch(`http://localhost:8000/api/logout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("Successfully Logged Out");
    })
    .catch((err) => {
      console.log(err);
    });
};

// set the cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove the cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localStrorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate user by pass data to cookie and localStorage
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
