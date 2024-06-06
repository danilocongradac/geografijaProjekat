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

const MapComponent = () => {

  useEffect( () => {
    const raster = new TileLayer({
      source: new OSM(),
    });

    const map = new Map({
      target: 'map',
      layers: [raster],
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
      <div id="map"></div>
    )
};

export default MapComponent;