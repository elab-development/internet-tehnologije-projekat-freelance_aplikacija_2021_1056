import { useState, useEffect } from 'react';
import axios from 'axios';

const useTipoviUsluga = (url) => {
  const [tipoviUsluga, setTipoviUsluga] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const responseData = response.data;

        if (responseData && Array.isArray(responseData.data)) {
          setTipoviUsluga(responseData.data);
        } else {
          console.error('Invalid response format:', responseData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        });
  }, [url]);

  return tipoviUsluga;
};

export default useTipoviUsluga;