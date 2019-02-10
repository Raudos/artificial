import React, { Component } from 'react';

import FilterContainer from './Filter/index';
import List from './List/List'

class ListContainer extends Component {
  emptyFilter = {
    currencies: [],
    hasSalary: false,
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
    fetch(`http://localhost:3003/scrapAskHnById?id=${this.state.id}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
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
      const hasFilters = currentFilter.hasSalary || currentFilter.types.length || currentFilter.currencies.length;

      if (!hasFilters) {
        return { filteredOffers: offers };
      }
      
      return {
        filteredOffers: offers.filter(offer => {
          const criteria = { currency: false, type: false };
    
          if (currentFilter.types.length) {
            criteria.type = Boolean(offer.types.filter(offer => currentFilter.types.includes(offer)).length);
          } else {
            criteria.type = true;
          }
    
          if (currentFilter.hasSalary) {
            criteria.currency = offer.hasSalary;
          } else {
            if (currentFilter.currencies.length) {
              criteria.currency = Boolean(offer.currencies.filter(curr => currentFilter.currencies.includes(curr)).length);
            } else {
              criteria.currency = true;
            }
          }
    
          return criteria.currency && criteria.type;
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
