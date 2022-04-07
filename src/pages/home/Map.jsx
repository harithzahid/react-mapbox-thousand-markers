import React, { useEffect, useRef, useMemo } from 'react';
import {render} from 'react-dom';
import { Map as MapGL, useMap, Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { getMapMarkers, initalizePage } from 'src/actions/map';
import { getMapMarkerList, getSelectedUser, getMapMarkerType } from 'src/reducers/map';
import { getUsersActions, getUserActions } from 'src/actions/user';

import Pin from 'src/components/Pin.jsx';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;
const MAP_STYLE = "mapbox://styles/mapbox/dark-v9";

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
    dispatch(initalizePage(boundsCoords));
  }

  const onMapDragEnd = () => {
    const boundsCoords = getBounds();
    dispatch(initalizePage(
      boundsCoords,
      mapMarkerType,
      1000
    ));
  }

  const onMapZoomEnd = () => {
    const boundsCoords = getBounds();
    dispatch(initalizePage(
      boundsCoords,
      mapMarkerType,
      1000
    ));
  }

  const onClickMarker = (id) => {
    dispatch(getUserActions(id));
  }

  const pins = useMemo(
    () =>
      mapMarkerList.map((item, index) => {
        const isPinSelected = selectedUser?.id === item.id;
        return (
          <Marker
            key={`marker-${item.id}`}
            longitude={item.coordinates[0]}
            latitude={item.coordinates[1]}
            anchor="bottom"
          >
            <Pin
              pinStyle={{ fill: isPinSelected ? 'green' : 'red' }}
              size={isPinSelected ? 35 : 20}
              onClick={() => { onClickMarker(item.id) }}
            />
          </Marker>
        )
      }),
    [mapMarkerList, selectedUser]
  );

  return (
    <MapGL
      id="mainMap"
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={MAP_STYLE}
      initialViewState={{
        latitude: 40,
        longitude: -100,
        zoom: 6
      }}
      style={{
        width: '100%',
        height: window.innerHeight
      }}
      onLoad={onMapLoad}
      onDragEnd={onMapDragEnd}
      onZoomEnd={onMapZoomEnd}
    >
      {pins}
    </MapGL>
  );
}

export default Map;
