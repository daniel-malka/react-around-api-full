let BASE_URL = "http://localhost:3001";
// const BASE_URL2 = "https://localhost:3001";

const customFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};

module.exports = {
  BASE_URL,
  customFetch,
};
