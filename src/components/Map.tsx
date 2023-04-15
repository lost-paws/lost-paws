import React, { FC, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import PetsMarker from './PetsMarker';
import { petsData } from './petsDataInterface';
import { GeolibInputCoordinates } from 'geolib/es/types';
import * as geolib from 'geolib';

interface MapProps {
  petsArray: petsData[]
  setPetsInfoArray: React.Dispatch<React.SetStateAction<petsData[]>>
}

const Map: FC<MapProps> = ({ petsArray, setPetsInfoArray }) => {
  // Interface for position
  interface Coords {
    lat: number;
    lng: number;
  }

  const [center, setCenter] = useState<Coords>({ lat: 48.769768, lng: -122.485886 });
  const [zoom, setZoom] = useState(10);
  const [isGeolocationFetched, setIsGeolocationFetched] = useState(false);
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    const queryGeolocation = async () => {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          const userCoords: Coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('These are the userCoords:', userCoords);
          setCenter(userCoords);
          setZoom(11);
          setIsGeolocationFetched(true);
        });
      }
    };

    queryGeolocation();
  }, []);


  const handleLoad = ({ map, maps }: { map: any; maps: any }) => {
    setMaps(maps);
  };

    // iterate through petsArray

    //filter petArray, calculate distance in miles then exclude all pets whose distance is too great
    const petsFilteredByDistance = petsArray.filter((pet) => {
      const petCoords: GeolibInputCoordinates = {
        lat: pet.lat,
        lng: pet.lng
      }
      const userCurrentLoc: GeolibInputCoordinates = {
        lat: center.lat,
        lng: center.lng
      }
      const distanceMiles = geolib.getDistance(petCoords, userCurrentLoc) * 0.00062137;
      console.log('Distance:', distanceMiles);
      if (distanceMiles < 2000) return pet;
    })

    //if maps object is available, map over pet array, otherwise we return an empty react fragment
    const petsDataToRender = maps ? petsFilteredByDistance.map((petData, i) => {
      const { lat, lng } = petData
      return (
        // <Button lat={lat} lng={lng}>petData.name</Button>
        <PetsMarker key={i} lat = {lat} lng={lng} center={center} petData={petData} petsArray={petsArray} keyInArr={i} setPetsInfoArray={setPetsInfoArray}/>
      )
    }) : <React.Fragment/>
    console.log('pets Data to render', petsDataToRender)
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {isGeolocationFetched ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBro2kUXbOjXXxiQqn7bhx1Udcf5Nowx4c' }}
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={handleLoad}
          yesIWantToUseGoogleMapApiInternals
        >
          {petsDataToRender}
          {/* <Button lat = {59.955413} lng={30.337844} text="Marker"/> */}
        </GoogleMapReact>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
};

export default Map;

