import React from 'react';
import './SelectDropdown.css';

const SelectDropdown = ({ options, selectedValue, handleChange }) => {
  return (
    <div>
        <label className="select-label">Crtanje:</label>
        <select className="form-control mr-2 mb-2 mt-2" onChange={handleChange} value={selectedValue}>
        {options.map((option, index) => (
            <option key={index} value={option}>
            {option}
            </option>
        ))}
        </select>
    </div>
  );
};

export default SelectDropdown;
