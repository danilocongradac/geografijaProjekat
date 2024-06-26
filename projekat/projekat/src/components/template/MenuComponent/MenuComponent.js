import React, { useState, useEffect, useRef} from 'react'
import ToggleSwitch from '../../atoms/ToggleSwitch/ToggleSwitch';
import styles from './MenuComponentStyles';
import ColorPickerImage from '../../../assets/images/art.png';

const MenuComponent = ( {checks, checksStatus, colors} ) => {

    const [isOn1, setIsOn1] = useState(false);
    const [isOn2, setIsOn2] = useState(false);
    const [isOn3, setIsOn3] = useState(false);
    const [isOn4, setIsOn4] = useState(false);
    const [isOn5, setIsOn5] = useState(false);

    useEffect(() => {
        if(checksStatus!=undefined){
            setIsOn1(checksStatus[0]);
            setIsOn2(checksStatus[1]);
            setIsOn3(checksStatus[2]);
            setIsOn4(checksStatus[3]);
            setIsOn5(checksStatus[4]);
        }
      }, [checksStatus]);
    

    const handleToggle1 = (event) => {
        setIsOn1(!isOn1);
        checks[0](event);
    };

    const handleToggle2 = (event) => {
        setIsOn2(!isOn2);
        checks[1](event);
    };

    const handleToggle3 = (event) => {
        setIsOn3(!isOn3);
        checks[2](event);
    };

    const handleToggle4 = (event) => {
        setIsOn4(!isOn4);
        checks[3](event);
    };
    
    const handleToggle5 = (event) => {
        setIsOn5(!isOn5);
        checks[4](event);
    };

   return (
        <div style={styles.menuContainer}>
            <div style={styles.menuItem}><div><ToggleSwitch id={1} isOn={isOn1} handleToggle={(handleToggle1)} /> Land Use</div> <img src={ColorPickerImage} onClick={(colors[0])}></img></div>
            <div style={styles.menuItem}><div><ToggleSwitch id={2} isOn={isOn2} handleToggle={(handleToggle2)} /> Putevi</div> <img src={ColorPickerImage} onClick={(colors[1])}></img></div>
            <div style={styles.menuItem}><div><ToggleSwitch id={3} isOn={isOn3} handleToggle={(handleToggle3)} /> Objekti</div> <img src={ColorPickerImage} onClick={(colors[2])}></img></div>
            <div style={styles.menuItem}><div><ToggleSwitch id={4} isOn={isOn4} handleToggle={(handleToggle4)} /> WMS raster</div></div>
            <div style={styles.menuItem}><div><ToggleSwitch id={5} isOn={isOn5} handleToggle={(handleToggle5)} /> Crtanje</div> </div>
        </div>    
    )
  };
  
  export default MenuComponent;