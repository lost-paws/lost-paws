import React, { FC, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import PetsMarker from './PetsMarker';
import petsData from './petsInterface';
import { GeolibInputCoordinates } from 'geolib/es/types';
import * as geolib from 'geolib';
import { setMaxIdleHTTPParsers } from 'http';


// export interface petsData {
//   lat: number,
//   lng: number,
//   _id: number,
//   owner_id: number,
//   date_last_seen: string,
//   species: string,
//   breed: string,
//   description: string,
//   name: string,
//   img_src: string
// }

interface MapProps {
  petsArray: petsData[]
}

const Map: FC<MapProps> = ({ petsArray }) => {
  // Interface for position
  interface Coords {
    lat: number;
    lng: number;
  }

  const [center, setCenter] = useState<Coords>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(0);
  const [isGeolocationFetched, setIsGeolocationFetched] = useState(false);
  const [mapLoaded, setMapLoaded] = useState<any>(null);

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

  const handleLoad = ({ map, maps}: {map: any; maps:any}) => {
    setMapLoaded(maps);
  }

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
      if (distanceMiles < 12) return pet;
    })

    // iterate through petsArray

    const petsDataToRender = mapLoaded ? petsFilteredByDistance.map((petData, i) => {
      const { lat, lng } = petData
      return (
        // <Button lat={lat} lng={lng}>petData.name</Button>
        <PetsMarker key={i} lat = {lat} lng={lng} center={center} petData={petData}/>
      )
    }) : <React.Fragment/>


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