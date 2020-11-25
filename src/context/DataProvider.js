import React, { useState } from 'react';
import propTypes from 'prop-types';
import fetchPlanets from '../services/Api';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [columnFilter, setColumnFilter] = useState([]);
  const [comparisonFilter, setComparisonFilter] = useState([]);
  const [valueFilter, setValueFilter] = useState([]);
  const [result, setResult] = useState([]);

  const getInfoPlanets = async () => {
    const infoPlanets = await fetchPlanets();
    setData(infoPlanets);
    setResult(infoPlanets);
  };

  const handleChange = (e) => {
    const inputInfo = e.target.value;
    const dataFilter = data
      .filter((element) => element.name.toUpperCase()
        .includes(inputInfo.toUpperCase()));
    setResult(dataFilter);
    setInputText(inputInfo);
  };

  const contextValue = {
    data,
    setData,
    inputText,
    setInputText,
    getInfoPlanets,
    handleChange,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    result,
    setResult,
  };

  return (
    <DataContext.Provider value={ { contextValue } }>
      { children }
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: propTypes.arrayOf(propTypes.object).isRequired,
};

export default DataProvider;
