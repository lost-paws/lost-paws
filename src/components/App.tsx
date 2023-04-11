import React, { FC } from 'react';
import MapContainer from '../MapContainer';
import AddPet from './AddPetButton';
import LoginButton from './LoginButton';
import Map from './TestMap';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

const App: FC = (props) => {
  
  return (
    <>
      <h1>all dogs go to  heaven</h1>
      <LocalizationProvider>
        <MapContainer />
        <AddPet />
        <LoginButton />
      </LocalizationProvider>
    </>
  );
};

export default App;