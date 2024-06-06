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

  const setAllLayersHidden = () => {
    layers.array.forEach(element => {
        if (layers.getIndex(element) != 0){
          element.setVisible(false)
        }
    });
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
 
  useEffect( () => {
    layers = [raster, landuse, roads]
        
    const map = new Map({
      target: 'map',
      layers: layers,
      view: new View({
        center: olProj.fromLonLat([19.833549, 45.267136]),
        zoom: 14,
      })
    });

    return () => {
      map.setTarget(null);
    };

  }, []);  
  return (
    <div id='glavni'>
      <div id="map"></div>
      <MeniComponent check1={toggleLandUse} check2={toggleRoads}/>
    </div>
  )
};

export default MapComponent;