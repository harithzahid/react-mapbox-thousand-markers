import React, { useEffect, useRef, useMemo } from 'react';
import {render} from 'react-dom';
import { Map as MapGL, useMap, Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { getMapMarkers } from 'src/actions/map';
import { getMapMarkersData } from 'src/reducers/map';

import Pin from './Pin.jsx';

const TOKEN = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

const Map = () => {
  const dispatch = useDispatch();
  const mapMarkersData = useSelector(getMapMarkersData);
  const mapRef = useRef();

  const getBounds = () => {
    return mapRef.current.getBounds().toArray();
  }

  const onMapLoad = () => {
    const boundsCoords = getBounds();
    dispatch(getMapMarkers(boundsCoords))
  }

  const onMapDragEnd = () => {
    const boundsCoords = getBounds();
    dispatch(getMapMarkers(boundsCoords));
  }

  const onMapZoomEnd = () => {
    const boundsCoords = getBounds();
    dispatch(getMapMarkers(boundsCoords));
  }

  const pins = useMemo(
    () =>
      mapMarkersData.map((coord, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={coord[0]}
          latitude={coord[1]}
          anchor="bottom"
        >
          <Pin />
        </Marker>
      )),
    [mapMarkersData]
  );

  return (
    <div>
      <MapGL
        ref={mapRef}
        onLoad={onMapLoad}
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.6,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
        style={{
          width: '100%',
          height: window.innerHeight
        }}
        onDragEnd={onMapDragEnd}
        onZoomEnd={onMapZoomEnd}
      >
        {pins}
      </MapGL>
    </div>
  );
}

export default Map;
