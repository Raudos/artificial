import React from 'react';
import PropTypes from 'prop-types';

import Loader from "../../../generic/Loader";
import FilterButton from './FilterButton/FilterButton';
import FilterTitle from './FilterTitle/FilterTitle';

import './filters.scss';

const initialisedLoader = Loader({
  isErrored: (props) => props.types === null || props.currencies === null,
  isLoading: (props) => props.types === undefined || props.currencies === undefined,
});

const Filters = (props) => {
  const { currencies, currentFilter, hasOffers, id, onFilterCurrenciesChange, onFilterTypesChange, onIdChange, types } = props;
  
  return (
    <div className="row hnFilters">
      <div className="col-12">
        <FilterTitle title="Hacker News ID" />
        
        <input className="hnFilters__idInput" onChange={onIdChange} value={id} />
      </div>
      
      <div className="col-12 col-md-6">
        <FilterTitle title="Technologies" />
        
        {types.map(type => (
          <FilterButton
            key={type}
            isActive={Boolean(currentFilter.types.find(filter => filter === type))}
            isDisabled={!hasOffers}
            onFilterChange={onFilterTypesChange}
            value={type}
          />
        ))}
      </div>
      
      <div className="col-12 col-md-6">
        <FilterTitle title="Salary" />
        
        <FilterButton
          customAttributes={{
            'data-filtertype': 'salarybool',
          }}
          isActive={currentFilter.hasSalary}
          isDisabled={!hasOffers}
          onFilterChange={onFilterCurrenciesChange}
          value="Has Salary"
        />
        
        {currencies.map(curr => (
          <FilterButton
            key={curr}
            isActive={Boolean(currentFilter.currencies.find(filter => filter === curr) || currentFilter.hasSalary)}
            isDisabled={!hasOffers}
            onFilterChange={onFilterCurrenciesChange}
            value={curr}
          />
        ))}
      </div>
    </div>
  );
};

Filters.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFilter: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    hasSalary: PropTypes.bool,
    types: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  hasOffers: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onFilterCurrenciesChange: PropTypes.func.isRequired,
  onFilterTypesChange: PropTypes.func.isRequired,
  onIdChange: PropTypes.func.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default initialisedLoader(Filters);
