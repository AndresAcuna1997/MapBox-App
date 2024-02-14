import { BtnMyLocation } from '../components/BtnMyLocation';
import { MapView } from '../components/MapView';
import { SearchBar } from '../components/SearchBar';
import { TravelDetail } from '../components/TravelDetail';
export const HomeScreen = () => {
  return (
    <>
      <SearchBar />
      <MapView />
      <BtnMyLocation />
      <TravelDetail />
    </>
  );
};