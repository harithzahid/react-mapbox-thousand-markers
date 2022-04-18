import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import {render} from 'react-dom';
import { Map as MapGL, useMap, Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMapMarkers, updateViewportActions } from 'src/actions/map';
import { fetchUsers, fetchUser } from 'src/actions/user';
import { selectMapMarkers, selectUser, selectMapMarkerType } from 'src/store';
import { USER_TYPE } from 'src/constants';

import Pin from 'src/components/Pin.jsx';

/**
 * Bug fix for production build
 * An error occurred while parsing the WebWorker bundle. This is most likely due to improper transpilation by Babel;
 * Uncaught ReferenceError: y is not defined
 * Reference: https://github.com/visgl/react-map-gl/issues/1266
 */
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;
const MAP_STYLE = "mapbox://styles/mapbox/dark-v9";

const Map = () => {
  const dispatch = useDispatch();
  const markers = useSelector(selectMapMarkers);
  const markerType = useSelector(selectMapMarkerType);
  const user = useSelector(selectUser);
  const mapRef = useRef();

  const onMapLoad = useCallback(() => {
    const bounds = mapRef.current.getBounds().toArray();
    dispatch(updateViewportActions(
      bounds,
      USER_TYPE.CONTRACTOR
    ));
  }, [])

  const onMapMoveEnd = useCallback(() => {
    const bounds = mapRef.current.getBounds().toArray();
    dispatch(updateViewportActions(
      bounds,
      markerType,
      1000
    ));
  }, [markerType])

  const onClickMarker = useCallback((id) => {
    dispatch(fetchUser(id));
  }, [])

  const pins = useMemo(
    () =>
      markers.map((item, index) => {
        const isPinSelected = user?.id === item.id;
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
    [markers, user]
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
      onMoveEnd={onMapMoveEnd}
    >
      {pins}
    </MapGL>
  );
}

export default Map;
