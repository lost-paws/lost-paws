import React, { FC, ReactElement } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './MapContainer.css';
import { borderRadius } from '@mui/system';


const MapContainer: FC = () => {
  return (
     <Container className='container' maxWidth="lg">
        <Box className='container' sx={{ bgcolor: '#cfe8fc', height: '100vh', borderRadius: '16px'}} />
      </Container>
  )
}

export default MapContainer;