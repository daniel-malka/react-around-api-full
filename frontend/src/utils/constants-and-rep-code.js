let BASE_URL = "http://localhost:3001";
let BASE_URL2 = "api.around-dan.chickenkiller.com";
const customFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};

module.exports = {
  BASE_URL,
  BASE_URL2,
  customFetch,
};
