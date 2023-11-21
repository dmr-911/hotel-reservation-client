import axios from "axios";

export const axiosInterceptorInstance = axios.create({
  baseURL: "http://www.localhost:8000/", // Replace with your API base URL
});
