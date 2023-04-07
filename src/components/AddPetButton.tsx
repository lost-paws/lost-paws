import React, { FC } from 'react';
import Button from '@mui/material/Button';



const petAdded = () => {
  console.log('Once click, a pet should be added')
}

const AddPet: FC = () => {
  return (
    <>
    <Button variant="contained" sx={{ bgcolor: 'dda15e',  ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={() => petAdded()}>Add Pet</Button>
    </>
    // <button className='addPet-btn' onClick={() => handleClick()}>Login</button>
  );
};

export default AddPet;

