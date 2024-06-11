import React, { useState, useEffect, useRef} from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import {Fill, Stroke, Style} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import {click} from 'ol/events/condition';
import './map.css';
import MeniComponent from './MeniComponent';

const MapComponent = () => {
  const [layers, setLayers] = useState([]);
  const [ukupnaPovrsina, setUkupnaPovrsina] = useState(0);
  const selected = useRef([]);

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });
   
    //Karta inteziteta na površini lokalnog tla za povratni period od 975 godina - nadjeno na linku nekog beogradskog faksa, ne znam sta tacno predstavlja ta mapa
    const wms = new TileLayer({ 
      source: new TileWMS({
        url: 'http://osgl.grf.bg.ac.rs/geoserver/osgl_3/wms?service=wms&version=1.3.0&request=GetMap&layers=povrsina_lokalnosti_975_region&bbox=18,40,24,48&width=512&height=512&format=image/png',
        //params: {'LAYERS': 'objekat'},
        serverType: 'geoserver',
        transition: 0,
      }),
    });

    const landuse = new VectorLayer({
      source: new VectorSource({
        url: '/PODACI/landuse.geojson',
        format: new GeoJSON(),
      }),
    });
    
    const roads = new VectorLayer({
      source: new VectorSource({
        url: '/PODACI/roadsns.geojson',
        format: new GeoJSON(),
      }),
    });
    
    const objekti = new VectorLayer({
      source: new VectorSource({
        url: '/PODACI/objekti_ns.geojson',
        format: new GeoJSON(),
      }),
    });
    
    const initialLayers = [raster, landuse, roads, objekti, wms];
    setLayers(initialLayers);
    
    const map = new Map({
      target: 'map',
      layers: initialLayers,
      view: new View({
        center: olProj.fromLonLat([19.833549, 45.267136]),
        zoom: 14,
      }),
    });

    initialLayers.slice(1).forEach(layer => layer.setVisible(false));

    const selectStyleMultiple = new Style({
      fill: new Fill({
        color: 'rgba(33, 97, 140, 0.81)',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 2,
      }),
    });

    map.on('singleclick', function (e) {
      map.forEachFeatureAtPixel(e.pixel, function (f) {
        const selIndex = selected.current.indexOf(f);
        const povrsina = Math.round(f.getGeometry().getArea());
        if (selIndex < 0) {
          selected.current.push(f);
          f.setStyle(selectStyleMultiple);
          setUkupnaPovrsina(prev => prev + povrsina);
        } else {
          selected.current.splice(selIndex, 1);
          f.setStyle(undefined);
          setUkupnaPovrsina(prev => prev - povrsina);
        }
      });
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  const toggleLayerVisibility = (index) => (event) => {
    layers[index].setVisible(event.target.checked);
  };

  return (
    <div id='glavni'>
      <MeniComponent
        check1={toggleLayerVisibility(1)}
        check2={toggleLayerVisibility(2)}
        check3={toggleLayerVisibility(3)}
        check4={toggleLayerVisibility(4)}
      />
      {ukupnaPovrsina > 0 && (
        <p id="ukupnaPovrsina">Ukupna povrsina selektovanih objekata: {ukupnaPovrsina} m²</p>
      )}
      <div id="map"></div>
    </div>
  );
};

export default MapComponent;
