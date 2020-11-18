import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import mainFilter from '../helpers/filters';
import PlanetsTableBody from './PlanetsTableBody';

function PlanetsTable() {
  const { fetchedPlanets,
    tableHeaders,
    filters: { filterByName: { name } },
    filters: { filterByNumericValues },
  } = useContext(StarWarsContext);

  const filteredPlanets = mainFilter(fetchedPlanets, name, filterByNumericValues);

  return (
    <main>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => <th key={ header }>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          <PlanetsTableBody planets={ filteredPlanets } tableHeaders={ tableHeaders } />
        </tbody>
      </table>
    </main>
  );
}

export default PlanetsTable;
