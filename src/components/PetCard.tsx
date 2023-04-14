import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, {FC, useState} from 'react';
import { petsData } from './petsDataInterface';
//@ts-ignore

// type petDataType = {
//     lat: number,
//     lng: number,
//     _id: number,
//     owner_id: number,
//     date_last_seen: string,
//     species: string,
//     breed: string,
//     description: string,
//     name: string,
//     img_src: string
// }

// interface setShowPetCardProps {
//     setShowPetCard?: React.Dispatch<React.SetStateAction<boolean>>,
//     petData?: petDataType
// }

const PetCard = ({petData, setShowPetCard}) => {
    console.log('petdata inside pet card component -->', petData)

    const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 300,
    height: 350,
    border: '2px solid #000',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    columnGap: '10px',
    bgcolor: "white"
}

    const editPetCard = () => {
        //first need to check that this is the user
        console.log('edited!')
    }

    const deletePetCard = () => {
        console.log('deleted')
    }

    return (
        <>
        <Modal
        open={setShowPetCard}>
            <Box sx={style}> 
            <div className = "title">
                <h1>{petData.name}</h1>
                <h2>{petData.breed} - {petData.species}</h2>
                {/* //need to add logic for owner and image */}
            </div>
            <div className = "form">
                {/* Breed Field */}
                <Typography>{petData.description}</Typography>
                <Typography>Last Seen on: {petData.date_last_seen}</Typography>
                <Typography>Last Seen at: {petData.address}</Typography>
                {/*Location Last Seen Field */}

            </div>
            <Button variant='contained' onClick={() => editPetCard()}>Edit Pet Info</Button>
            <Button variant='contained' onClick={() => deletePetCard()}>Delete Entry </Button>
            <Button variant="contained" onClick={() => setShowPetCard(false)}>Go Back</Button>
            </Box>
        </Modal>
        </>
    );
}

export default PetCard ;