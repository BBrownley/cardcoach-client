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

const userService = {
  register
};

export default userService;
