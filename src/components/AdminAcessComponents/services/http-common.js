import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/employees",
  // baseURL: "http://localhost:8080",
  // Accept: 'application/json',
  // "Access-Control-Origin": "*"
  headers: {
    "Content-type": "application/json",
      "Accept": 'application/json',
        "Access-Control-Origin": "*"
  }
});