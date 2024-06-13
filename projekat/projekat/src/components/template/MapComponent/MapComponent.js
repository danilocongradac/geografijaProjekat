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
import MenuComponent from '../MenuComponent/MenuComponent';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';
import { SketchPicker } from 'react-color';

const MapComponent = () => {
  const [layers, setLayers] = useState([]);
  const [ukupnaPovrsina, setUkupnaPovrsina] = useState(0);
  const [layersModal, setLayersModal] = useState(false);
  const [landuseColor, setLanduseColor] = useState('#00FF00');
  const [landuseLayer, setLanduseLayer] = useState(null);
  const [roadsColor, setRoadsColor] = useState('#00FF00');
  const [roadsLayer, setRoadsLayer] = useState(null);
  const [objectsColor, setObjectsColor] = useState('#00FF00');
  const [objectsLayer, setObjectsLayer] = useState(null);
  const [openLanduseColor, setOpenLanduseColor] = useState(false);
  const [openRoadsColor, setOpenRoadsColor] = useState(false);
  const [openObjectsColor, setOpenObjectsColor] = useState(false);
  const [layerSwitch, setLayerSwitch] = useState([false, false, false, false])

  const selected = useRef([]);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });
   
    const wms = new TileLayer({ 
      source: new TileWMS({
        url: 'http://osgl.grf.bg.ac.rs/geoserver/osgl_3/wms?service=wms&version=1.3.0&request=GetMap&layers=povrsina_lokalnosti_975_region&bbox=18,40,24,48&width=512&height=512&format=image/png',
        serverType: 'geoserver',
        transition: 0,
      }),
    });

    const landuse = new VectorLayer({
      source: new VectorSource({
        url: '/PODACI/landuse.geojson',
        format: new GeoJSON(),
      }),
      style: new Style({
        fill: new Fill({ color: '#00FF00' }),
        stroke: new Stroke({ color: '#000000', width: 1 }),
      }),
    });
    setLanduseLayer(landuse);


    const roads = new VectorLayer({
      source: new VectorSource({
        url: '/PODACI/roadsns.geojson',
        format: new GeoJSON(),
      }),
      style: new Style({
        fill: new Fill({ color: '#00FF00' }),
        stroke: new Stroke({ color: '#000000', width: 1 }),
      }),
    });

    setRoadsLayer(roads);
    
    const objekti = new VectorLayer({
      source: new VectorSource({
        url: '/PODACI/objekti_ns.geojson',
        format: new GeoJSON(),
      }),
      style: new Style({
        fill: new Fill({ color: '#00FF00' }),
        stroke: new Stroke({ color: '#000000', width: 1 }),
      }),
    });

    setObjectsLayer(objekti);

    
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

    mapRef.current = map;

    initialLayers.slice(1).forEach(layer => layer.setVisible(false));

    const selectStyleMultiple = new Style({
      fill: new Fill({
        color: 'rgba(33, 97, 140, 0.81)',
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

  const exportPNG = () => {
    const map = mapRef.current;

    map.once('rendercomplete', function () {
      const mapCanvas = document.createElement('canvas');
      const size = map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext('2d');
      Array.prototype.forEach.call(
        map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity =
              canvas.parentNode.style.opacity || canvas.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
  
            const backgroundColor = canvas.parentNode.style.backgroundColor;
            if (backgroundColor) {
              mapContext.fillStyle = backgroundColor;
              mapContext.fillRect(0, 0, canvas.width, canvas.height);
            }
  
            let matrix;
            const transform = canvas.style.transform;
            if (transform) {
              // Get the transform parameters from the style's transform matrix
              matrix = transform
                .match(/^matrix\(([^\(]*)\)$/)[1]
                .split(',')
                .map(Number);
            } else {
              matrix = [
                parseFloat(canvas.style.width) / canvas.width,
                0,
                0,
                parseFloat(canvas.style.height) / canvas.height,
                0,
                0,
              ];
            }
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );
      mapContext.globalAlpha = 1;
      mapCanvas.toBlob(function (blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'map.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
    map.renderSync();
  }
  

  const toggleLayerVisibility = (index) => (event) => {
    layers[index].setVisible(event.target.checked);
   
  };

  const handleLayersModalToggle = () => {
    setLayersModal(prev => !prev);
  };

  useEffect(() => {
    if (landuseLayer) {
      landuseLayer.setStyle(new Style({
        fill: new Fill({ color: landuseColor }),
        stroke: new Stroke({ color: '#000000', width: 1 }),
      }));
    }
    if (roadsLayer){
      roadsLayer.setStyle(new Style({
        fill: new Fill({ color: roadsColor }),
        stroke: new Stroke({ color: roadsColor, width: 1 }),
      }));
    }
    if (objectsLayer){
      objectsLayer.setStyle(new Style({
        fill: new Fill({ color: objectsColor }),
        stroke: new Stroke({color: '#000000', width: 1 }),
      }));
    }
  }, [landuseColor, landuseLayer, roadsLayer, roadsColor, objectsColor, objectsLayer]);

  const handleLanduseColorChange = (newColor) => {
    setLanduseColor(newColor.hex);
  };

  const handleRoadsColorChange = (newColor) => {
    setRoadsColor(newColor.hex);
  };

  const handleObjectsColorChange = (newColor) => {
    setObjectsColor(newColor.hex);
  };

  const handleColorEditOpening = (index) =>{
      
      switch(index){
        case 1:
          setOpenLanduseColor(!openLanduseColor);
          setOpenObjectsColor(false);
          setOpenRoadsColor(false);
          break;
        case 2:
          setOpenRoadsColor(!openRoadsColor);
          setOpenLanduseColor(false);
          setOpenObjectsColor(false); 
          break;
        case 3:
          setOpenObjectsColor(!openObjectsColor);
          setOpenLanduseColor(false);
          setOpenRoadsColor(false);
          break;
      }
  }
  return (
    <div id='glavni'>
      <Navbar onClicks={[handleLayersModalToggle, exportPNG]}></Navbar>
      
      <div id="map" style={{position:'relative'}}>
        <Modal visible={layersModal} title={"Layers"}>
            <MenuComponent
              checks={[toggleLayerVisibility(1), toggleLayerVisibility(2), toggleLayerVisibility(3), toggleLayerVisibility(4)]}
              colors={[
                () => handleColorEditOpening(1),
                () => handleColorEditOpening(2),
                () => handleColorEditOpening(3),
              ]}
            />
          <div style={{paddingTop:'20px', display:'flex', justifyContent:'center', width:'100%'}}>
          {openLanduseColor && <SketchPicker color={landuseColor} onChangeComplete={handleLanduseColorChange}  />}
          {openRoadsColor &&  <SketchPicker color={roadsColor} onChangeComplete={handleRoadsColorChange} />}
          {openObjectsColor && <SketchPicker color={objectsColor} onChangeComplete={handleObjectsColorChange} />}
          </div>
        </Modal>
        <Modal visible={ukupnaPovrsina>0} title={'Povrsina'}>
            <p id="ukupnaPovrsina">Ukupna povrsina selektovanih objekata: {ukupnaPovrsina} m²</p>
        </Modal>
      </div>
    </div>
  );
};

export default MapComponent;

