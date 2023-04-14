/* eslint-disable @typescript-eslint/ban-ts-comment */
import { InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import React, {useState} from 'react';


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
//@ts-ignore
const PetCard = ({petData, setShowPetCard, keyInArr, petsArray, setPetsInfoArray}) => {
    let petName:string;
    let breed: string;
    let species: unknown;
    let description: string;
    let date_last_seen: string;
    let address: string;
    
    const [editButtonClicked, setEditButtonClicked] = useState(false)

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

    const editPetCard = async () => {
        //clone the state
        let stateToChangeAndUpdate = petsArray;
        
        //update the animal
        
        const editedAnimal = {
            name: petName || petData.name,
            breed: breed || petData.breed,
            species: species || petData.species,
            description: description || petData.description,
            date_last_seen: date_last_seen || petData.date_last_seen,
            address: address || petData.address
        }

        const newEditedAnimal = {
            ...stateToChangeAndUpdate[keyInArr],
            ...editedAnimal
        }

        //make a call to the backend to update the animal
        stateToChangeAndUpdate = await axios.patch(`/api/v1/pets/${stateToChangeAndUpdate[keyInArr]._id}`, newEditedAnimal)
        console.log(stateToChangeAndUpdate)
        setPetsInfoArray(stateToChangeAndUpdate.data);
        return setEditButtonClicked(false);
    }

    const deletePetCard = async () => {
        let text = "Are you sure you want to delete this pet from the entire database?";
        if(confirm(text) === true){
            let stateToChangeAndUpdate = petsArray;
            const deletedPet = stateToChangeAndUpdate[keyInArr]
            stateToChangeAndUpdate = await axios.delete(`/api/v1/pets/${deletedPet._id}`)
            setPetsInfoArray(stateToChangeAndUpdate.data)
          text = "Pet Deleted!"  
        } else text = "Cancelled"
    }

    if (!editButtonClicked){
        return (
            <>
            <Modal
            open={setShowPetCard}>
                <Box sx={style}> 
                <div className = "title">
                    <h1>{petData.name} </h1>
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
                <Button variant='contained' onClick={() => setEditButtonClicked(true)}>Edit Pet Info</Button>
                <Button variant='contained' onClick={() => deletePetCard()}>Delete Entry </Button>
                <Button variant="contained" onClick={() => setShowPetCard(false)}>Go Back</Button>
                </Box>
            </Modal>
            </>
            );
    } else {
        return (
            <>
            <Modal
            open={setShowPetCard}>
                <Box sx={style}> 
                <div className = "form">
                {/* Date Last Seen Field */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label="Date Last Seen" 
                    // @ts-ignore
                    renderInput={(params) => <TextField {...params}/>}
                    //@ts-ignore
                    onChange={(newValue) => date_last_seen = newValue} 
                    />
                </LocalizationProvider>

                {/* Species Selector Field */}
                <InputLabel id="species-label">Species</InputLabel>
                <Select fullWidth onChange={(e) => species = e.target.value}>
                    <MenuItem value={'Dog'}>Dog</MenuItem>
                    <MenuItem value={'Cat'}>Cat</MenuItem>
                </Select>

                {/* Breed Field */}
                <TextField fullWidth label='Breed' variant='filled' defaultValue = {petData.breed} onChange={e => breed = e.target.value}></TextField>

                {/*Location Last Seen Field */}
                <TextField fullWidth label='Address' defaultValue = {petData.description} variant='filled' onChange={e => address = e.target.value}></TextField>

                {/* petname field */}
                <TextField fullWidth label="Name" variant='filled' defaultValue = {petData.name} onChange={e => petName = e.target.value}></TextField>

                {/* Description Field */}
                <TextField fullWidth label="Description" variant='filled' defaultValue = {petData.description} onChange={e => description = e.target.value}></TextField>

            </div>
                <Button variant='contained' onClick={() => editPetCard()}>Save</Button>
                <Button variant='contained' onClick={() => setEditButtonClicked(false)}>Cancel</Button>
                </Box>
            </Modal>
            </>
        )
    }
}

export default PetCard ;