import React, { useState, useEffect, useRef} from 'react'
import './map.css';

const MeniComponent = ( {check1, check2, check3, check4} ) => {
   return (
        <div id="meni">
        <label><input type='checkbox' id='btn1' onChange={check1}></input>Prikazi Land Use</label>
        <label><input type='checkbox' id='btn2' onChange={check2}></input>Prikazi puteve</label>
        <label><input type='checkbox' id='btn3' onChange={check3}></input>Prikazi objekte</label>
        <label><input type='checkbox' id='btn4' onChange={check4}></input>Prikazi WMS raster</label>
        </div>    
    )
  };
  
  export default MeniComponent;