import React from 'react';

const Filter = ({ filter, onFilterChange }) => (
  <input
    type="text"
    className="form-input"
    value={filter}
    onChange={(e) => onFilterChange(e.target.value)}
  />
);

export default Filter;
