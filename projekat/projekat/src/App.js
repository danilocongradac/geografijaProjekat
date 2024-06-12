import React from 'react';
import MapComponent from './MapComponent';
import MeniComponent from './MeniComponent'
import Navbar from './components/template/Navbar/Navbar';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Projekat iz geoinformatike</h1>
      </header> */}
      {/* <Navbar></Navbar> */}
      <MapComponent/>
    </div>
  );
}

export default App;
