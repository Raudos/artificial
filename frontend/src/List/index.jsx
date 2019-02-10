import React, { Component } from 'react';
import axios from 'axios';

import FilterContainer from './Filter/index';
import List from './List/List'

class ListContainer extends Component {
  emptyFilter = {
    currencies: [],
    hasSalary: false,
    isRemote: false,
    types: [],
  };
  idTimeout = null;
  
  constructor(props) {
    super(props);

    this.state = {
      currentFilter: this.emptyFilter,
      id: '18589702',
      filteredOffers: undefined,
      offers: undefined,
    };
  };
  
  componentDidMount() {
    this.fetchOffers();
  }
  
  fetchOffers = () => {
    axios.get(`http://localhost:3003/scrapAskHnById?id=${this.state.id}`)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
        
        throw new Error();
      })
      .then((offers) => {
        this.setState({
          filteredOffers: offers,
          offers,
        });
      })
      .catch(() => {
        this.setState({
          filteredOffers: null,
          offers: null,
        });
      });
  };
  
  filterOffers = () => {
    this.setState(({ currentFilter, offers }) => {
      const hasFilters = currentFilter.hasSalary || currentFilter.types.length || currentFilter.currencies.length || currentFilter.isRemote;

      if (!hasFilters) {
        return { filteredOffers: offers };
      }
      
      return {
        filteredOffers: offers.filter(offer => {
          const criteriaPassed = { currency: false, remote: true, type: true };
    
          if (currentFilter.types.length) {
            criteriaPassed.type = Boolean(offer.types.filter(offer => currentFilter.types.includes(offer)).length);
          }
    
          if (currentFilter.hasSalary) {
            criteriaPassed.currency = offer.hasSalary;
          } else {
            if (currentFilter.currencies.length) {
              criteriaPassed.currency = Boolean(offer.currencies.filter(curr => currentFilter.currencies.includes(curr)).length);
            } else {
              criteriaPassed.currency = true;
            }
          }
          
          if (currentFilter.isRemote) {
            criteriaPassed.remote = offer.remote;
          }
    
          return criteriaPassed.currency && criteriaPassed.remote && criteriaPassed.type;
        }),
      }
    });
  };
  
  handleFilterCurrenciesChange = ({ target }) => {
    this.setState(({ currentFilter }) => {
      if (target.dataset.filtertype === 'salarybool') {
        currentFilter.hasSalary = !currentFilter.hasSalary;
        currentFilter.currencies = [];
      } else {
        const { currencies } = currentFilter;
        currentFilter.hasSalary = false;
        const filterIndex = currencies.indexOf(target.name);
  
        if (filterIndex >= 0) {
          currencies.splice(filterIndex, 1);
        } else {
          currencies.push(target.name);
        }
      }
      
      return { currentFilter };
    }, () => {
      this.filterOffers();
    });
  };
  
  handleFilterRemoteChange = () => {
    this.setState( ({ currentFilter }) => ({
      currentFilter: {
        ...currentFilter,
        isRemote: !currentFilter.isRemote,
      },
    }), () => {
      this.filterOffers();
    });
  };
  
  handleFilterTypesChange = ({ target }) => {
    this.setState(({ currentFilter }) => {
      const { types } = currentFilter;
      const filterIndex = types.indexOf(target.name);
  
      if (filterIndex >= 0) {
        types.splice(filterIndex, 1);
      } else {
        types.push(target.name);
      }
      
      return { currentFilter };
    }, () => {
      this.filterOffers();
    });
  };
  
  handleIdChange = (e) => {
    this.setState({
      currentFilter: this.emptyFilter,
      id: e.target.value,
      filteredOffers: undefined,
      offers: undefined,
    }, () => {
      if (this.idTimeout) {
        clearTimeout(this.idTimeout);
      }
      
      this.idTimeout = setTimeout(this.fetchOffers, 500);
    });
  };
  
  render() {
    return (
      <div className="container">
        <FilterContainer
          currentFilter={this.state.currentFilter}
          hasOffers={Boolean(this.state.offers)}
          id={this.state.id}
          onFilterCurrenciesChange={this.handleFilterCurrenciesChange}
          onFilterRemoteChange={this.handleFilterRemoteChange}
          onFilterTypesChange={this.handleFilterTypesChange}
          onIdChange={this.handleIdChange}
        />
        
        <List
          offers={this.state.filteredOffers}
        />
      </div>
    );
  };
};

export default ListContainer;
