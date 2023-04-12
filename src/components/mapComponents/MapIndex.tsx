import React, { FC, useCallback, useState } from 'react';
import petsData from '../petsInterface';
import MapParent from './MapParent';


const MapIndex = () => {
  // declare pets state
  const [petsInfoArray, setPetsInfoArray] = React.useState<petsData[]>([]);
  // fetch pets data
  React.useEffect(() => {
    // fetch data
    const getData = async () => {
      let petsState: petsData[] = [];
      const data = await fetch('/api/v1/pets');
      const parsedData = await data.json();
      petsState = parsedData;
      setPetsInfoArray(petsState);
    }
    getData();
  }, [])
  
  React.useEffect(() => {
    console.log('This is petsInfoArray:', petsInfoArray)
  }, [petsInfoArray])

  // set the zoom state & center (should be based on user's loc)
  const [zoom , setZoom] = useState<number>(5);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 37.78746222,
    lng: -122.412923,
  });

  // declare onIdle func, which runs when map is idle (not adjusted based on zoom)
  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom!());
    const nextCenter = map.getCenter();
    if (nextCenter) setCenter(nextCenter.toJSON());
  };

  // declare activePet
  const [activePet, setActivePet] = useState<petsData|null>(null);

  // onClick method for markers, will set the clicked pet to be the active pet
  const onMarkerClicked = useCallback(
    (payload: petsData) => {
      if (activePet === payload) setActivePet(null);
      else setActivePet(payload);
    },
   [activePet])

   return (
    <div>
      <MapParent
        apiKey={'AIzaSyBro2kUXbOjXXxiQqn7bhx1Udcf5Nowx4c'}
        center={center}
        zoom={zoom}
        markers={petsInfoArray}
        onIdle={onIdle}
        onMarkerClicked={onMarkerClicked}
        activePetId={activePet?._id}
      />
    </div>
   )

}