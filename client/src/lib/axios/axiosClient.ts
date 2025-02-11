import axios from "axios";

const REACT_APP_API_URL = import.meta.env.API_URL;

export default axios.create({
  baseURL: `http://${REACT_APP_API_URL}/`,
});
