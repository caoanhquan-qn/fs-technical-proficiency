import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default baseAPI;
