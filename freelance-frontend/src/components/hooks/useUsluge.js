import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsluge = (url) => {
  const [usluge, setUsluge] = useState([]); 

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const responseData = response.data;
  
        //provera da li imamo neki odgovor i da li je tipa niz
        if (responseData && Array.isArray(responseData.usluge)) {
          setUsluge(responseData.usluge);
        } else {
          //ako je u losem formatu
          console.error('Invalid response format:', responseData);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [url]);

  return usluge; 
};

export default useUsluge;
