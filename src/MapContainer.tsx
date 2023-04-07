import React, { FC, ReactElement } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const MapContainer: FC = () => {
  return (
    <>
     <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
        <h1>Hello world</h1>
      </Container>
    </>
  )
}

export default MapContainer;