import React, { FC } from 'react';
import Button from '@mui/material/Button';



function handleClick (){
    console.log('will take you to the login page')
}

const AddPet: FC = () => {
  return (
    <>
    <Button variant="contained">Add Pet</Button>
    </>
    // <button className='addPet-btn' onClick={() => handleClick()}>Login</button>
  );
};

export default AddPet;

