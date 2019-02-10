import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../generic/Loader';
import Offer from './Offer/Offer';

import './list.scss';

const initialisedLoader = Loader({
  isErrored: (props) => props.offers === null,
  isLoading: (props) => props.offers === undefined,
});

class List extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pagination: 10,
    };
  };
  
  showMore = () => {
    this.setState(state => ({
      pagination: state.pagination + 20,
    }));
  };
  
  render() {
    const { pagination } = this.state;
    const { offers } = this.props;
    
    return (
      <div className="row offersList">
        <div className="col-12">
          <p className="offersList__nbrOfElements">{`Number of elements - ${offers.length}`}</p>
        </div>
        <div className="col-12">
          <React.Fragment>
            {offers.slice(0, pagination).map((offer, index) => (
              <Offer
                key={offer.id}
                data={offer}
                index={index + 1}
              />
            ))}
          </React.Fragment>
        </div>
        
        {pagination < offers.length && (
          <div className="col-12">
            <button className="offersList__showMore" onClick={this.showMore}>Show more</button>
          </div>
        )}
      </div>
    );
  }
}

List.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    hasSalary: PropTypes.bool,
    id: PropTypes.number,
    remote: PropTypes.bool,
    text: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default initialisedLoader(List);
