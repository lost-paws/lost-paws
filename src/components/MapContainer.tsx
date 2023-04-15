import React, { FC } from 'react';
import Container from '@mui/material/Container';
import './MapContainer.css';
import Map from './Map';
import { petsData } from './petsDataInterface';
import _ from 'lodash';



const MapContainer: FC = () => {
  console.log('rendered!')

  const [petsInfoArray, setPetsInfoArray] = React.useState<petsData[]>([]);

  React.useEffect(() => {
    // fetch data
    const getData = async () => {
      let petsState: petsData[] = [];
      const data = await fetch('/api/v1/pets');
      const parsedData = await data.json();
      petsState = parsedData
      // setPetsInfoArray(petsState);
      if (!_.isEqual(petsState, petsInfoArray)) {
        setPetsInfoArray(petsState);
      }
    }
    getData();
  }, [petsInfoArray])


  return (
     <Container className='container' maxWidth="lg">
        <Map petsArray={petsInfoArray} setPetsInfoArray={setPetsInfoArray}/>
      </Container>
  )
}

export default MapContainer;