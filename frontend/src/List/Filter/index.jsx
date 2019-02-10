import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters/Filters';

class FilterContainer extends Component {
  static handleFetchSuccess = (res) => {
    if (res.status === 200) {
      return res.json();
    }
    
    throw new Error();
  };
  static handleFetchError = () => null;
  
  constructor(props) {
    super(props);
    
    this.state = {
      currencies: undefined,
      types: undefined,
    };
  };
  
  componentDidMount() {
    this.initialiseFilters();
  }
  
  initialiseFilters = async () => {
    const types = await fetch('http://localhost:3003/getTypes')
      .then(FilterContainer.handleFetchSuccess)
      .catch(FilterContainer.handleFetchError);
    const currencies = await fetch('http://localhost:3003/getCurrencies')
      .then(FilterContainer.handleFetchSuccess)
      .catch(FilterContainer.handleFetchError);
  
    this.setState({
      currencies,
      types,
    });
  };
  
  render() {
    return (
      <Filters
        {...this.props}
        currencies={this.state.currencies}
        types={this.state.types}
      />
    );
  };
};

FilterContainer.defaultProps = {
  id: '',
};

FilterContainer.propTypes = {
  currentFilter: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    hasSalary: PropTypes.bool,
    types: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  hasOffers: PropTypes.bool.isRequired,
  id: PropTypes.string,
  onFilterCurrenciesChange: PropTypes.func.isRequired,
  onFilterTypesChange: PropTypes.func.isRequired,
  onIdChange: PropTypes.func.isRequired,
};

export default FilterContainer;
