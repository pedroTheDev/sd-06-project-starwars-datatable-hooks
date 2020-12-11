import React, { useContext, useState, useEffect, useRef } from 'react';
import AppContext from '../context/AppContext';

const dropDownFilterValues = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const HEAD = [
  'name',
  'diameter',
  'climate',
  'created',
  'edited',
  'films',
  'gravity',
  'orbital_period',
  'population',
  'rotation_period',
  'surface_water',
  'terrain',
  'url',
];

function Filter() {
  const {
    planets,
    setFilteredPlanets,
    filters,
    setFilters,
    setName,
    filterFields,
    setFilterFields,
  } = useContext(AppContext);

  const [chosenField, setChosenField] = useState(filterFields[0]);
  const [filtersUpdated, setFiltersUpdated] = useState(false);
  const COMPONENT_DID_MOUNT = useRef();

  useEffect(() => {
    if (COMPONENT_DID_MOUNT.current) {
      setFilters((prev) => ({
        filterByName: { ...prev.filterByName },
        filterByNumericValues: prev.filterByNumericValues.concat({
          column: filterFields[0],
          comparison: 'maior que',
          value: 0,
        }),
        order: { ...prev.order },
      }));
      COMPONENT_DID_MOUNT.current = true;
    }
  }, [filtersUpdated]);

  const ZERO = 0;

  const manageMultipleFilter = ({ column, comparison, value }) => {
    console.log('manageMultipleFilter');
    if (value !== ZERO) {
      switch (comparison) {
      case 'maior que':
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[column]) > Number(value)
          && planet[column] !== 'unknown')));
        break;
      case 'menor que':
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[column]) < Number(value)
          && planet[column] !== 'unknown')));
        break;
      default:
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[column]) === Number(value)
          && planet[column] !== 'unknown')));
      }
      /* setFilters((prev) => ({
        ...prev.filterByName,
        order: { ...prev.order },
        filterByNumericValues: [...prev.filterByNumericValues, {
          column: chosenField,
          comparison: chosenComparison,
          value: chosenValue,
        }],
      }));
      setFilterFields(filterFields.filter((field) => chosenField !== field)); */
    }
    setFiltersUpdated(!filtersUpdated);
  };

  useEffect(() => {
    setChosenField(filterFields[0]);
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.map((filter) => (
        manageMultipleFilter(filter)
      ));
    } else {
      setFilteredPlanets([]);
    }
  }, [filterFields]);

  const [localColumn, setLocalColumn] = useState('name');
  const [localSort, setLocalSort] = useState('ASC');

  const COMPARISON_TYPE = ['maior que', 'menor que', 'igual a'];
  const [chosenComparison, setChosenComparison] = useState('maior que');
  const [chosenValue, setChosenValue] = useState(ZERO);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === 'name') {
      setName(value);
    }
  };

  const manageFilter = () => {
    if (chosenValue !== ZERO && filterFields.includes(chosenField)) {
      switch (chosenComparison) {
      case 'maior que':
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[chosenField]) > Number(chosenValue)
          && planet[chosenField] !== 'unknown')));
        break;
      case 'menor que':
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[chosenField]) < Number(chosenValue)
          && planet[chosenField] !== 'unknown')));
        break;
      default:
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[chosenField]) === Number(chosenValue)
          && planet[chosenField] !== 'unknown')));
      }
      setFilters((prev) => ({
        ...prev.filterByName,
        order: { ...prev.order },
        filterByNumericValues: [...prev.filterByNumericValues, {
          column: chosenField,
          comparison: chosenComparison,
          value: chosenValue,
        }],
      }));
      setFilterFields(filterFields.filter((field) => chosenField !== field));
    }
    setFiltersUpdated(!filtersUpdated);
  };

  useEffect(() => {
    manageFilter();
  }, [filters]);

  /*  const arrangeFilter = ({ column: field, comparison: compare, value }) => {
    if (value !== ZERO) {
      switch (compare) {
      case 'maior que':
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[field]) > Number(value)
          && planet[field] !== 'unknown')));
        break;
      case 'menor que':
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[field]) < Number(value)
          && planet[field] !== 'unknown')));
        break;
      default:
        setFilteredPlanets(planets.filter((planet) => (
          Number(planet[field]) === Number(value)
          && planet[field] !== 'unknown')));
      }
      setFilterFields(filterFields.filter((fieldAvalable) => chosenField
        !== fieldAvalable));
    }
  }; */

  const removeFilter = ({ column }) => {
    setFilters((prev) => ({ ...prev,
      ...prev,
      filterByNumericValues: filters.filterByNumericValues
        .filter((field) => field.column !== column),
    }));
  };

  const filterField = ({ target }) => {
    setChosenField(target.value);
  };

  const filterComparison = ({ target }) => {
    setChosenComparison(target.value);
  };

  /*  const filterSort = ({ target }) => {
    setFilters((prev) => ({
      ...prev.filterByName,
      ...prev.filterByNumericValues,
      order: {
        column: target.value,
        sort: prev.order.sort,
      },
    }));
  }; */

  const filterValue = ({ target }) => {
    setChosenValue(target.value);
  };

  const dropdownOption = (type) => (
    <option
      id={ type }
      name={ type }
      value={ type }
      key={ `${type}` }
    >
      { type }
    </option>
  );

  const updateOrder = () => {
    setFilters((prev) => ({
      ...prev,
      order: {
        column: localColumn,
        sort: localSort,
      },
    }));
  };

  /* const sortNumber = (a, b, column) => (
    // console.log(a, b, column)
    a[column] === 'unknown' || b[column] === 'unknown'
      ? -1
      :
    parseInt(a[column], 10) - parseInt(b[column], 10)
    // parseInt(a[column], 10) - parseInt(b[column], 10)
  ); */

  /* const sortTable = () => {
    const { column, sort } = filters.order;
    if (sort === 'ASC') {
      setFilteredPlanets(
        dropDownFilterValues.includes(column)
          ? planets.sort((a, b) => sortNumber(a, b, column))
          : planets.sort((a, b) => a[column].localeCompare(b[column])),
      );
    } else {
      setFilteredPlanets(
        dropDownFilterValues.includes(column)
          ? planets.sort((a, b) => sortNumber(b, a, column))
          : planets.sort((a, b) => b[column].localeCompare(a[column])),
      );
    }
  }; */

  /* const planetas = [
   { name: "Tatooine", rotation_period: "23", orbital_period: "304" },
   { name: "Alderaan", rotation_period: "24", orbital_period: "364" },
   { name: "Yavin IV", rotation_period: "24", orbital_period: "4818" },
   { name: "Hoth", rotation_period: "23", orbital_period: "549" },
   { name: "Dagobah", rotation_period: "23", orbital_period: "341" },
   { name: "Bespin", rotation_period: "12", orbital_period: "5110" },
   { name: "Endor", rotation_period: "18", orbital_period: "402" },
   { name: "Naboo", rotation_period: "26", orbital_period: "312" },
   { name: "Coruscant", rotation_period: "24", orbital_period: "368" },
   { name: "Kamino", rotation_period: "27", orbital_period: "463" },
];

planetas.sort((a, b) => a[name] - b[name])
planetas.sort((a, b) => a[name] > b[name]))

  */

  return (
    <div>
      <form>
        <label htmlFor="name">
          Name
          <input
            data-testid="name-filter"
            id="name"
            name="name"
            type="text"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <select
          data-testid="column-filter"
          value={ chosenField }
          onChange={ (e) => filterField(e) }
        >
          { dropDownFilterValues.filter((options) => !filters.filterByNumericValues
            .map((c) => c.column).includes(options))
            .map((field) => dropdownOption(field)) }
        </select>
        <select
          data-testid="comparison-filter"
          value={ chosenComparison }
          onChange={ (e) => filterComparison(e) }
        >
          {COMPARISON_TYPE.map((type, index) => dropdownOption(type, index))}
        </select>
        <label htmlFor="value">
          Value
          <input
            data-testid="value-filter"
            id="value"
            name="value"
            type="number"
            onChange={ (e) => filterValue(e) }
          />
        </label>
        <button
          type="button"
          onClick={ (e) => manageFilter(e) }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      { filters.filterByNumericValues.length > ZERO
        && filters.filterByNumericValues
          .map((filter) => (
            <div
              className="filter"
              data-testid="filter"
              key={ filter }
            >
              { filter.column }
              <button
                type="button"
                onClick={ () => removeFilter(filter) }
              >
                x
              </button>
            </div>
          ))}
      <select
        data-testid="column-sort"
        value={ localColumn }
        onChange={ (e) => setLocalColumn(e.target.value) }
      >
        { HEAD.map((column) => dropdownOption(column)) }
      </select>
      <div>
        <label
          htmlFor="column-sort-input-asc"
        >
          Ascendente
          <input
            onChange={ (e) => setLocalSort(e.target.value) }
            type="radio"
            data-testid="column-sort-input-asc"
            id="column-sort-input-asc"
            name="column-sort-input"
            value="ASC"
          />
        </label>
        <label
          htmlFor="column-sort-input-dsc"
        >
          Descendente
          <input
            onChange={ (e) => setLocalSort(e.target.value) }
            type="radio"
            data-testid="column-sort-input-desc"
            id="column-sort-input-dsc"
            name="column-sort-input"
            value="DSC"
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ updateOrder }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Filter;
