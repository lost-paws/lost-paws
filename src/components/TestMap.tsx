import React, { FC, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from './TestButton';

const Map: FC = () => {
  // Interface for position
  interface Coords {
    lat: number;
    lng: number;
  }

  const [center, setCenter] = useState<Coords>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(0);
  const [isGeolocationFetched, setIsGeolocationFetched] = useState(false);

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
          setZoom(5);
          setIsGeolocationFetched(true);
        });
      }
    };

    queryGeolocation();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {isGeolocationFetched ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBro2kUXbOjXXxiQqn7bhx1Udcf5Nowx4c' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Button lat = {59.955413} lng={30.337844} text="Marker"/>
        </GoogleMapReact>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
};

export default Map;