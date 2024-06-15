import React from 'react';
import styles from './NavbarStyles';
import NavbarItem from '../../molecules/NavbarItem/NavbarItem';

const Navbar = ({onClicks}) => {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>Projekat iz geoinformatike</div>
      <div style={styles.navLinks}>
        <NavbarItem title={"Layers"} onClick={onClicks[0]}></NavbarItem>
        <NavbarItem title={"Export as png"} onClick={onClicks[1]}></NavbarItem>
        
      </div>
    </div>
  );
};

export default Navbar;
