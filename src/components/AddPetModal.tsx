import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const AddPetModal = ({setOpenModal}: Props) => {
    return (
        <Box >
            <button onClick={() => setOpenModal(false)}> X </button>
            <div className = "title">
                <h1>Enter your pet information.</h1>
            </div>
            <div className = "form">
                <input type='text'></input>
            </div>
            <div className = "footer">
                <button>Submit</button>
                <button>Cancel</button>
            </div>
        </Box>
);
}

export default AddPetModal ;