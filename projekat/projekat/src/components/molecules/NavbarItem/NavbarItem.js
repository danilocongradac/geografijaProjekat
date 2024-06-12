import React from 'react';
import styles from './NavbarItemStyles';
import { useState } from 'react';

const NavbarItem = ({title, onClick}) => {

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    const NavbarItemStyles = {
        ...styles.navItem,
        ...(hover ? styles.navItemHover : {}),
    };


    return (
        <div style={NavbarItemStyles} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {title}
        </div>
    );
};

export default NavbarItem;
