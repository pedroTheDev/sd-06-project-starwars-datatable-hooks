import React, { useContext, useEffect } from 'react';
import getAPI from '../services/api/api';

import context from '../services/context/context';

function Table() {
  const {
    data,
    setData,
    filtered,
    nameFilter,
    applyNameFilter,
    filteredResults,
    applyNumberFilter,
    appliedFilters,
    funcao,
  } = useContext(context);

  async function callAPI() {
    await setData(await getAPI());
  }

  useEffect(() => {
    callAPI();
  }, []);

  const zero = 0;

  const values = {
    column: '',
    compare: 'greater',
    value: zero,
  };

  if (data.length === zero) {
    return <h1>Loading...</h1>;
  }

  const ShowFilterOptions = () => (
    appliedFilters.map((filter, index) => (
      <div key={ index }>
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => values.column = target.value }
          value={ filter.columnType }
        >
          <option value="None">None</option>
          {filter.possibleFilters.map((column, i) => (
            <option key={ i } value={ column }>{ column }</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => values.compare = target.value }
          value={ filter.compareType }
        >
          {/* <option value="None">None</option> */}
          <option value="greater">maior que</option>
          <option value="less">menor que</option>
          <option value="equal">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          onChange={ ({ target }) => values.value = target.value }
          type="number"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            funcao(values, index);
            console.log(values);
          } }
        >
          Que Seja
        </button>
      </div>
    ))
  );

  const TableHead = (
    <thead>
      <tr>
        <th>name</th>
        <th>rotation period</th>
        <th>orbital period</th>
        <th>diameter</th>
        <th>climate</th>
        <th>gravity</th>
        <th>terrain</th>
        <th>surface water</th>
        <th>population</th>
        <th>films</th>
        <th>created</th>
        <th>edited</th>
        <th>url</th>
      </tr>
    </thead>
  );

  function TableBody() {
    let temp = [];
    if (filtered) temp = filteredResults;
    else temp = data;

    return (
      temp.map((planet, index) => (
        <tr key={ index }>
          <td>{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      ))
    );
  }

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => applyNameFilter(target.value) }
        value={ nameFilter }
      />
      { ShowFilterOptions() }
      <table>
        { TableHead }
        <tbody>
          { TableBody() }
        </tbody>
      </table>
    </>
  );
}

export default Table;
