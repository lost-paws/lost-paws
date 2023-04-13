import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, {FC, useState} from 'react';

const PetCard: FC = () => {

    return (
        <Modal
        open={true}
        >
            <Box>
            <div className = "title">
                <h1>Enter your pet information.</h1>
            </div>
            <div className = "form">


                {/* Breed Field */}
                <TextField fullWidth label='Breed' variant='filled'></TextField>

                {/*Location Last Seen Field */}
                <TextField fullWidth label='Location Last Seen' variant='filled'></TextField>


            </div>
            </Box>
        </Modal>
    );
}

export default PetCard ;