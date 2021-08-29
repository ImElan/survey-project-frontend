import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/employees",
  // Accept: 'application/json',
  // "Access-Control-Origin": "*"
  headers: {
    "Content-type": "application/json",
      "Accept": 'application/json',
        "Access-Control-Origin": "*"
  }
});