import axios from "axios";

import baseUrl from "./baseUrl";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};

const register = async data => {
  const req = await axios.get(`${baseUrl}`, config);
  console.log(req);
};

const userService = {
  register
};

export default userService;
