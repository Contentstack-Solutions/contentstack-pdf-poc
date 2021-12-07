const fetcher = (url) =>
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    api_key: 'blt96064fdc54e97cf0',
    access_token: 'csa5f441b7e4574711a8ef136e'
  },
}).then((res) => res.json());

export default fetcher