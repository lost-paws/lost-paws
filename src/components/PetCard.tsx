import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, {FC, useState} from 'react';
import { petsData } from './petsDataInterface';

type petDataType = {
    lat: number,
    lng: number,
    _id: number,
    owner_id: number,
    date_last_seen: string,
    species: string,
    breed: string,
    description: string,
    name: string,
    img_src: string
}

interface setShowPetCardProps {
    setShowPetCard: React.Dispatch<React.SetStateAction<boolean>>,
    petData: petDataType
}
const PetCard: FC<setShowPetCardProps> = () => {

    return (
        // <Modal
        // open={true}
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
            <Button>Go Back</Button>
            </Box>
        // </Modal>
    );
}

export default PetCard ;