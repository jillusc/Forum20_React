import axios from "axios";

axios.defaults.baseURL = "https://forum20-a5050d8397b8.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();