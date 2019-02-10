import React from 'react';
import PropTypes from 'prop-types';

import './filterTitle.scss';

const FilterTitle = (props) => {
  const { title } = props;
  
  return (
    <div className="row filterTitle">
      <div className="col-12">
        <h5 className="filterTitle__heading">{title}</h5>
      </div>
    </div>
  );
};

FilterTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FilterTitle;
