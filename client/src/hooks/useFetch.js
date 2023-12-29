

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useFetch(url) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error.message);

      }
      setLoading(false);
    }
    fetchUrl()
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error.message);

    }
    setLoading(false);
  }
  return { data, error, loading, reFetch }
}

export default useFetch