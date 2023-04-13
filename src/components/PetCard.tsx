import { Typography } from '@mui/material';
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
    setShowPetCard?: React.Dispatch<React.SetStateAction<boolean>>,
    petData: petDataType
}

const PetCard: FC<setShowPetCardProps> = ({setShowPetCard, petData}): JSX.Element => {
    console.log('petdata inside pet card component -->', petData)

    const editPetCard = () => {
        //first need to check that this is the user
        console.log('edited!')
    }

    const deletePetCard = () => {
        console.log('deleted')
    }

    return (
        // <Modal
        // open={true}
            <Box> 
            <div className = "title">
                <h1>{petData.name}</h1>
                <h2>{petData.breed} - {petData.species}</h2>
                //need to add logic for owner and image
            </div>
            <div className = "form">
                {/* Breed Field */}
                <Typography>{petData.description}</Typography>
                <Typography>Last Seen on: {petData.date_last_seen}</Typography>

                {/*Location Last Seen Field */}

            </div>
            <Button variant="contained" onClick={() => setShowPetCard(false)}>Go Back</Button>
            <Button variant='contained' onClick={() => editPetCard()}>Edit Pet Info</Button>
            <Button variant='contained' onClick={() => deletePetCard()}>Delete Entry </Button>
            </Box>
        // </Modal>
    );
}

export default PetCard ;