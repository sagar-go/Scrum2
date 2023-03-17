import { getToken } from "../utils/util";
import axios from "axios";
// import { apibasePath } from '../../config';

let token = localStorage.getItem("token");

const apiRequest = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export default apiRequest;
