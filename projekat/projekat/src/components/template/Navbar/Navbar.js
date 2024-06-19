import React from 'react';
import styles from './NavbarStyles';
import NavbarItem from '../../molecules/NavbarItem/NavbarItem';
import SelectDropdown from '../../atoms/SelectDropdown/SelectDropdown';

const Navbar = ({onClicks, drawValue}) => {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>Projekat iz geoinformatike</div>
      <div style={styles.navLinks}>
        <NavbarItem title={"Layers"} onClick={onClicks[0]}></NavbarItem>
        <NavbarItem title={"Export as png"} onClick={onClicks[1]}></NavbarItem>
        <NavbarItem title={"Oznaceni objekti"} onClick={onClicks[2]}></NavbarItem>
        <SelectDropdown options={["Point", "LineString", "Circle", "Polygon", "None"]} handleChange={onClicks[3]} selectedValue={drawValue}></SelectDropdown>
      </div>
    </div>
  );
};

export default Navbar;
