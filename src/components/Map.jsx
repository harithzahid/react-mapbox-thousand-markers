import React, { useEffect, useRef, useMemo } from 'react';
import {render} from 'react-dom';
import { Map as MapGL, useMap, Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { getMapMarkers } from 'src/actions/map';
import { getMapMarkerList, getSelectedUser, getMapMarkerType } from 'src/reducers/map';

import Pin from './Pin.jsx';

const TOKEN = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

const Map = () => {
  const dispatch = useDispatch();
  const mapMarkerList = useSelector(getMapMarkerList);
  const mapMarkerType = useSelector(getMapMarkerType);
  const selectedUser = useSelector(getSelectedUser);
  const mapRef = useRef();

  const getBounds = () => {
    return mapRef.current.getBounds().toArray();
  }

  const onMapLoad = () => {
    const boundsCoords = getBounds();
    dispatch(getMapMarkers({
      coords: boundsCoords,
      user: 'contractor'
    }))
  }

  const onMapDragEnd = () => {
    const boundsCoords = getBounds();
    dispatch(getMapMarkers({
      coords: boundsCoords,
      user: mapMarkerType
    }))
  }

  const onMapZoomEnd = () => {
    const boundsCoords = getBounds();
    dispatch(getMapMarkers({
      coords: boundsCoords,
      user: mapMarkerType
    }))
  }

  const onClickMarker = (id) => {
    dispatch({
      type: 'SELECT_USER',
      payload: {
        data: mapMarkerList.find((item) => item.id === id)
      }
    })
  }

  const pins = useMemo(
    () =>
      mapMarkerList.map((item, index) => (
        <Marker
          key={`marker-${item.id}`}
          longitude={item.contractorInfo.coordinates[0]}
          latitude={item.contractorInfo.coordinates[1]}
          anchor="bottom"
        >
          <Pin
            pinStyle={{ fill: selectedUser?.id === item.id ? 'green' : 'red' }}
            size={selectedUser?.id === item.id ? 25 : 20}
            onClick={() => { onClickMarker(item.id) }}
          />
        </Marker>
      )),
    [mapMarkerList, selectedUser]
  );

  return (
    <div>
      <MapGL
        id="mainMap"
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
