import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_RAWG_API_KEY;

export const fetchDataFromApi = async (url, params) => {
  const { data } = await axios.get(`https://rawg.io/api/${url}`, {
    params: {
      key: API_KEY,
      params,
    },
  });
  console.log(url);
  return data;
};
