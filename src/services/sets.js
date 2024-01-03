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

// fetches all sets belonging to the current user
const getUserSets = async () => {
  try {
    const res = await axios.get(`${baseUrl}/sets`, config);
    const sets = res.data.userSets;
    return sets;
  } catch (err) {
    console.error("An unexpected error has occurred");
    return [];
  }
};

// fetches a single set belonging to the current user, along with its associated cards
const getUserSetById = async setId => {
  try {
    const res = await axios.get(`${baseUrl}/sets/${setId}`, config);
    const set = res.data;
    return set;
  } catch (err) {
    console.error("An unexpected error has occurred");
    return [];
  }
};

const setsService = {
  create,
  getUserSets,
  getUserSetById
};

export default setsService;
