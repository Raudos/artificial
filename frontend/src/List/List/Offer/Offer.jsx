import React from 'react';
import PropTypes from 'prop-types';

import './offer.scss';

const Offer = (props) => {
  return (
    <div className="row offerElement">
      <div className="col-12 offerElement__info">
        <div className="offerElement__elemNumber">{`#${props.index}.`}</div>
  
        <div className="offerElement__types">
          {props.data.types.map((type) => (
            <div key={type}>{type}</div>
          ))}
        </div>
      </div>
      
      <div className="col-12">
        {props.data.text}
      </div>
    </div>
  );
};

Offer.propTypes = {
  data: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasSalary: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    remote: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  index: PropTypes.number.isRequired,
};

export default Offer;
