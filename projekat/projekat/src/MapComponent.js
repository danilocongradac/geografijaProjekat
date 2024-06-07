import React, { useState, useEffect, useRef} from 'react'
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';

import TileWMS from 'ol/source/TileWMS';
import {Fill,Stroke, Style, Text} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';

import Select from 'ol/interaction/Select';
import {altKeyOnly, click, pointerMove, platformModifierKey, platformModifierKeyOnly} from 'ol/events/condition';

import './map.css'
import MeniComponent from './MeniComponent';

const MapComponent = () => {
  let layers = []
  

  const toggleLandUse = (event) => {
    layers[1].setVisible(event.target.checked);
  }
  
  const toggleRoads = (event) => {
    layers[2].setVisible(event.target.checked);
  }

  const toggleObjekti = (event) => {
    layers[3].setVisible(event.target.checked);
  }

  const setAllLayersHidden = () => {    
    for(let i=1; i < layers.length; i++){
      layers[i].setVisible(false)
    }
  }

  const raster = new TileLayer({
    source: new OSM(),
  });
 
  const landuse = new VectorLayer({
    source: new VectorSource({
      url: '/PODACI/landuse.geojson',
        format: new GeoJSON()
      }),
  });
  
  const roads = new VectorLayer({
    source: new VectorSource({
      url: '/PODACI/roadsns.geojson',
        format: new GeoJSON()
      }),
  });
  
  const objekti = new VectorLayer({
    source: new VectorSource({
      url: '/PODACI/objekti_ns.geojson',
        format: new GeoJSON()
      }),
  });
  
  layers = [raster, landuse, roads, objekti]

  setAllLayersHidden();

  //stil za prikaz selekcije
  const selectStyleSingle = new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.7)',
    }),
    stroke: new Stroke({
      color: 'black',
      width: 2,
    }),
  });
  const selectStyleMultiple = new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.7)',
    }),
    stroke: new Stroke({
      color: 'black',
      width: 2,
    }),
  });

  const selected = [];

  const selectClickMultiple = new Select({
    condition: click ,
  });
  
  const [ukupnaPovrsina, setUkupnaPovrsina] = useState(0);

  useEffect( () => {
    const map = new Map({
      target: 'map',
      layers: layers,
      view: new View({
        center: olProj.fromLonLat([19.833549, 45.267136]),
        zoom: 14,
      })
    });
    

    if (click){
      console.log('click');
    }

    map.on('singleclick' , function (e) {
      map.forEachFeatureAtPixel(e.pixel, function (f) {
        const selIndex = selected.indexOf(f);
        let povrsina=Math.round(f.getGeometry().getArea());
        if (selIndex < 0) {
          selected.push(f);
          f.setStyle(selectStyleMultiple);
          setUkupnaPovrsina(sUkupnaPovrsina => sUkupnaPovrsina + povrsina);
        } else {
          selected.splice(selIndex, 1);
          f.setStyle(undefined);
          setUkupnaPovrsina(sUkupnaPovrsina => sUkupnaPovrsina - povrsina);
        }

        //highlightStyle.getText().setText('P = ' + ukupnaPovrsina + ' m2');
      });
    
      console.log('ukupna povrsina: ', ukupnaPovrsina, 'm2');
    });

    return () => {
      map.setTarget(null);
    };
  }, []);  
  
  return (
    <div id='glavni'>
      <div id="map"></div>
      <MeniComponent check1={toggleLandUse} check2={toggleRoads} check3={toggleObjekti}/>
      <p id="ukupnaPovrsina">Ukupna povrsina selektovanih objekata: {ukupnaPovrsina}</p>
    </div>
  )
};

export default MapComponent;