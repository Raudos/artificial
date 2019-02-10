import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './filterButton.scss';

class FilterButton extends PureComponent {
  render() {
    const { customAttributes, isActive, isDisabled, onFilterChange, value } = this.props;

    return (
      <button
        {...customAttributes}
        data-testid="filterButton"
        className={classNames('filterButton', { 'filterButton--active': isActive })}
        disabled={isDisabled}
        name={value}
        onClick={onFilterChange}
      >
        {value}
      </button>
    );
  }
}

FilterButton.defaultProps = {
  customAttributes: {},
  isActive: false,
};

FilterButton.propTypes = {
  customAttributes: PropTypes.object,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterButton;
