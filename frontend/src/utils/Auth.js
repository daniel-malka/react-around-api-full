import { BASE_URL, BASE_URL2, customFetch } from "./constants-and-rep-code";

export const signUp = (email, password) => {
  return customFetch(`${BASE_URL2}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const signIn = ({ email, password }) => {
  return customFetch(`${BASE_URL2}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return customFetch(`${BASE_URL2}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
