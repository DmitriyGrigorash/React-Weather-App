import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { MapContext } from '../../context';
import { CountriesList, Country } from './types';
import COUNTRIES from '../../country-codes-lat-long-alpha3.json';

export const StyledSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 30vw;
  z-index: 100;
  background: white;
  overflow-y: scroll;
  height: 100%;
  box-shadow: -4px 0 15px black;
`;

export const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

const LocationsList = () => {
  const location = JSON.parse(window.localStorage.getItem("selectedCountry") || "{}");

  const [data, setData] = useState<[] | CountriesList>([]);
  const [country, setCountry] = useState<any>(location);
  const { toggleSelectedCountry } = useContext(MapContext);
  const [, setLoading] = useState(false);
  const [, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true)
      new Promise((res, rej) => res(COUNTRIES))
        .then((res: any) => setData([...res.ref_country_codes]));
    }
    catch(err){
        setError(err as any)
    } finally {
        setLoading(false)
    }
  },[])

  const handleCountry = useCallback((country: Country) => {
    const res = data.find((item) => item.alpha2 === country.alpha2);
    setCountry(res);
  }, [data]);

  useEffect(() => {
    toggleSelectedCountry(country);
    window.localStorage.setItem("selectedCountry", JSON.stringify(country));
  }, [country, toggleSelectedCountry]);

  return (
    <StyledSection>
        <List dense={true}>
          {data.map((item: Country) => (
            <ListItemButton key={item.country} onClick={() => handleCountry(item)}>
              <ListItemText primary={item.country} secondary={<span>Lat: {item.latitude} , Lng: {item.longitude}</span>} />
            </ListItemButton>
          ))}
        </List>
    </StyledSection>
  );
}

export default LocationsList;
