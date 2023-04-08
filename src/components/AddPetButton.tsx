import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import AddPetModal from './AddPetModal';


interface Props {

}

const AddPet: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
    <Button variant="contained" sx={{ bgcolor: 'dda15e',  ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={() => setOpenModal(true)}>Add Pet</Button>
    {openModal && <AddPetModal setOpenModal={setOpenModal}/>}
    </>
  );
};

export default AddPet;

