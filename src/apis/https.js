import { create } from "apisauce";

const baseURL = "https://adminapi.betikishadi.com";
// const baseURL = "http://localhost:8525";
// define the api
const https = create({
  baseURL,
  headers: {
    Accept: "application/vnd.github.v3+json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default https;
