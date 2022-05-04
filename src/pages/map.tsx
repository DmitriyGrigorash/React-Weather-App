import React from 'react';

import MapBox from '../features/MapBox/MapBox';
import LocationsList from '../features/LocationsList/List';

import { MapContext, useLocation } from '../context';

const Map = () => {
  const location = useLocation();
  return (
    <article>
      <MapContext.Provider value={location}>
        <LocationsList />
        <MapBox />
      </MapContext.Provider>
    </article>
  );
}

export default Map;
