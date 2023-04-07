import React, { FC } from 'react';
import MapContainer from '../MapContainer';
import LoginButton from './LoginButton';

const App: FC = (props) => {
  
  return (
    <>
      <h1>all dogs go to  heaven</h1>

      <MapContainer />

      <LoginButton />

    </>
  );
};

export default App;