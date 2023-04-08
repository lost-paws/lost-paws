import React, { FC, ReactElement } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './MapContainer.css';
import { borderRadius } from '@mui/system';
import TestMap from './components/TestMap';


const MapContainer: FC = () => {
  return (
    <>
     <Container className='container' maxWidth="lg">
        <TestMap />
      </Container>
    </>
  )
}

export default MapContainer;