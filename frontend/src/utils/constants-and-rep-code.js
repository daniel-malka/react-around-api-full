let node_env = "production";

let BASE_URL =
  node_env === "production"
    ? "https://www.around-dan.chickenkiller.com/"
    : "http://localhost:3000";
    
let BASE_URL2 =
  node_env === "production"
    ? "https://api.around-dan.chickenkiller.com/"
    : " http://localhost:3000";

const customFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};

module.exports = { BASE_URL, BASE_URL2, customFetch };
