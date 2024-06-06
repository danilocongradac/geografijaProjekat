import React, { useState, useEffect, useRef} from 'react'

const MeniComponent = ( {check1, check2} ) => {
   return (
        <div id="menu">
        <input type='checkbox' id='btn1' onChange={check1}></input>
        <input type='checkbox' id='btn2' onChange={check2}></input>
        </div>    
    )
  };
  
  export default MeniComponent;