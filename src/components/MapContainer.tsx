import React, { FC, ReactElement } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './MapContainer.css';
import { borderRadius } from '@mui/system';
import TestMap from './TestMap';
import { petsData } from './petsDataInterface';
import _ from 'lodash';
import './CircularView';
import SquareContainer from './Square'



const MapContainer: FC = () => {

  const [petsInfoArray, setPetsInfoArray] = React.useState<petsData[]>([{
    lat: 42.3601,
    lng: -71.0589,
    _id: 1,
    owner_id: 1,
    date_last_seen: 'today',
    species: 'dog',
    breed: 'pomeranian',
    name: 'Fido',
    description: 'is dog',
    img_src: '',
  }]);

  // React.useEffect(() => {
  //   // fetch data
  //   const getData = async () => {
  //     let petsState: petsData[] = [];
  //     const data = await fetch('/api/v1/pets');
  //     const parsedData = await data.json();
  //     petsState = parsedData;
  //     if (!_.isEqual(petsState, petsInfoArray)) {
  //       setPetsInfoArray(petsState);
  //     }
  //   }
  //   getData();
  // }, [petsInfoArray])


  return (
     <Container className='circularContainer' maxWidth="lg">
        <TestMap petsArray={petsInfoArray} />
      </Container>
  )
}

export default MapContainer;