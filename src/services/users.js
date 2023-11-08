import axios from "axios";

import baseUrl from "./baseUrl"; // base url of the server
import config from "./config";

// Registers a user into the system
// Returns an obj containing userId and JWT if successful
// Returns an object containing error messages if unsuccessful
const register = async user => {
  try {
    const res = await axios.post(`${baseUrl}/users`, user, config);

    // registration successful

    return res.data; // {id: int, token: string}
  } catch (err) {
    /* server error during registration. usually due to SQL unique constraints 
    (username/email already taken). or the client-side checks were 
    somehow bypassed */

    return { error: err.response.data };
  }
};

// Logs a user into the system
// Returns an object containing error messages if unsuccessful
const login = async user => {
  try {
    const res = await axios.post(`${baseUrl}/users/login`, user, config);
    console.log(res);
    // login successful
  } catch (err) {
    return { error: err.response.data };
  }
};

// Sends GET request to server to check if there is an httpOnly cookie jwt stored. If there is one,
// verify valid jwt, if valid, then user is currently logged in

const getUserSession = async () => {
  try {
    const res = await axios.get(`${baseUrl}/users/login`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return false;
  }
};

const userService = {
  register,
  login,
  getUserSession
};

export default userService;
