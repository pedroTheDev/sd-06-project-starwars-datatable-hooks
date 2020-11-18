import React, { useState } from 'react';
import { fetchStarWarsData } from '../services/starWarsAPI';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    const results = await fetchStarWarsData();
    setData(results)
  }

  return (
    <StarWarsContext.Provider value={ { data, getData }}>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;
