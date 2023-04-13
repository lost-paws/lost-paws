import React, { FC, ReactElement } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './MapContainer.css';
import { borderRadius } from '@mui/system';
import TestMap from './TestMap';
import { petsData } from './petsDataInterface';
import _ from 'lodash';



const MapContainer: FC = () => {

  const [petsInfoArray, setPetsInfoArray] = React.useState<petsData[]>([]);

  React.useEffect(() => {
    // fetch data
    const getData = async () => {
      let petsState: petsData[] = [];
      const data = await fetch('/api/v1/pets');
      const parsedData = await data.json();
      petsState = parsedData;
      if (!_.isEqual(petsState, petsInfoArray)) {
        setPetsInfoArray(petsState);
      }
    }
    getData();
  }, [petsInfoArray])


  return (
     <Container className='container' maxWidth="lg">
        <TestMap petsArray={petsInfoArray} />
      </Container>
  )
}

export default MapContainer;