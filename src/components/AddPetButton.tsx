import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import AddPetModal from './AddPetModal';



const AddPet: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
    <Button variant="contained" sx={{ 
      bgcolor: 'dda15e', 
      position: "fixed", 
      top: 10, right: 191, 
      zIndex: 2000,
      ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={() => setOpenModal(true)}>Add Pet</Button>
    {openModal && <AddPetModal openState={openModal} setOpenModal={setOpenModal}/>}
    </>
  );
};

export default AddPet;

