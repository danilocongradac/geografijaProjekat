import React, { useState } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ id, isOn, handleToggle }) => {
  return (
    <div className="toggle-switch">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="toggle-switch-checkbox"
        id={`toggle-switch-${id}`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && '#128ae0' }}
        className="toggle-switch-label"
        htmlFor={`toggle-switch-${id}`}
      >
        <span className={`toggle-switch-button`} />
      </label>
    </div>
  );
};

export default ToggleSwitch;
