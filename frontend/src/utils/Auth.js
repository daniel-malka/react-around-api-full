import { BASE_URL, customFetch } from './constants-and-rep-code';

export const signUp = (email, password) => {
  return customFetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'dabe6f5b-76a9-454b-a126-949e6970cf03',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const signIn = (email, password) => {
  return customFetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return customFetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
