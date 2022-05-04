import React, { useState, useCallback } from 'react';

interface Location {
    selectedCountry: null | object;
    toggleSelectedCountry: (country: object) => void;
}
export const MapContext = React.createContext<Location>({ selectedCountry: null, toggleSelectedCountry: (country: object) => {} });

export const useLocation = (): Location => {
    const [location, setLocation] = useState<null | object>(null);

    const setCurrentLocation = useCallback((currentLocation: object): void => {
        setLocation(currentLocation)
    }, []);

    return {
        selectedCountry: location,
        toggleSelectedCountry: setCurrentLocation
    }
};
