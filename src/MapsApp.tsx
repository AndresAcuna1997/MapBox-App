import { PlacesProvider } from './context/places/PlacesProvider';
import { HomeScreen } from './screens/HomeScren';

import './index.css';
import { MapProvider } from './context/map/MapProvider';

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
};