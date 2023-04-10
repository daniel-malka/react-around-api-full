const BASE_URL = 'https://register.nomoreparties.co';
let node_env = 'production';

let BASE_URL2 =
  node_env === 'production'
    ? 'api.dan.malk.chickenkiller.com'
    : 'http://localhost:3000';

const customFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};

module.exports = { BASE_URL, BASE_URL2, customFetch };
