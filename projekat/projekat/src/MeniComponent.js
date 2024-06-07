import React, { useState, useEffect, useRef} from 'react'

const MeniComponent = ( {check1, check2, check3} ) => {
   return (
        <div id="menu">
        <input type='checkbox' id='btn1' onChange={check1}></input>
        <input type='checkbox' id='btn2' onChange={check2}></input>
        <input type='checkbox' id='btn3' onChange={check3}></input>
        </div>    
    )
  };
  
  export default MeniComponent;