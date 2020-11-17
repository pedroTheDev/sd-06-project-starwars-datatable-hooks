import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarWarsAPI from '../services/StarWarsAPI';

function Table() {
  const [tableArray, setTableArray] = useState([]);
  const tableHeaders = ['Name', 'Rotation Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity', 'Terrain',
    'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];

  useEffect(() => {
    async function fetchAPI() {
      const data = await StarWarsAPI();
      setTableArray(data.results);
    }
    fetchAPI();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          {tableHeaders.map((table, i) => (
            <th key={ i }>{ table }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableArray.map((table, i) => (
          <tr key={ i }>
            <td>{ table.name }</td>
            <td>{ table.rotation_period }</td>
            <td>{ table.orbital_period }</td>
            <td>{ table.diameter }</td>
            <td>{ table.climate }</td>
            <td>{ table.gravity }</td>
            <td>{ table.terrain }</td>
            <td>{ table.surface_water }</td>
            <td>{ table.population }</td>
            <td>{ table.films }</td>
            <td>{ table.created }</td>
            <td>{ table.edited }</td>
            <td>{ table.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
