import axios from "axios";

import baseUrl from "./baseUrl"; // base url of the server
import config from "./config";

// creates a new flash card set
const create = async (title, description, cards) => {
  try {
    const payload = { title, description, cards };
    await axios.post(`${baseUrl}/sets`, payload, config);
  } catch (err) {
    return { error: err.response.data.error };
  }
};

const setsService = {
  create
};

export default setsService;
