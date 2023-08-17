import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../config/api";
import { toast } from "react-hot-toast";

const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(null);
    setError("");

    fetchDataFromApi(url, { ...params })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
        toast.error(`Having error while fetching ${url}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, params]);
  return { data, loading, error };
};

export default useFetch;
