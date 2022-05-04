import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

import { MapContext } from '../../context';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFucGUiLCJhIjoiY2t6bXU4M3MwMnM3bzJvb2N3YnZpdHFkNiJ9.pumYaHbnfCKFH3Hdm0Rh0w';

export const StyledSection = styled.section`
  height: 100vh;
`;
export const StyledMap = styled.div`
  height: 100%;
`;

const MapBox = () => {
  const { selectedCountry } = useContext(MapContext);

  const mapContainer = useRef(null);
  let map: any = useRef(null);
  const [lng, ] = useState(-70.9);
  const [lat, ] = useState(42.35);
  const [zoom, ] = useState(9);

  const marker = new mapboxgl.Marker();
  const popup = new mapboxgl.Popup({ closeOnClick: false });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as any,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    
    if (selectedCountry) {
      const { latitude, longitude }: any = selectedCountry;
      map.current.flyTo({center: [longitude, latitude], zoom: 6});

      marker.setLngLat([longitude, latitude]).addTo(map.current);
      popup.setLngLat([longitude, latitude + 0.5]).setHTML('<p>Weather info</p>').addTo(map.current);
    }
  },[selectedCountry])

  return (
    <StyledSection>
      <StyledMap ref={mapContainer} />
    </StyledSection>
  );
}
export default MapBox;
