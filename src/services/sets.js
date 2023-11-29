import axios from "axios";

import baseUrl from "./baseUrl"; // base url of the server
import config from "./config";

// creates a new flash card set
const create = async (title, description, cards) => {
  try {
    const payload = { title, description, cards };
    console.log("1");
    const res = await axios.post(`${baseUrl}/sets`, payload, config);
    console.log("2");

    console.log(res);
  } catch (err) {
    console.log(err);
    return { error: err.response.data.error };
  }
};

const setsService = {
  create
};

export default setsService;
