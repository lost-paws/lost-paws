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
const PetCard = ({petData, setShowPetCard, petsArray, setPetsInfoArray}) => {
    
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [petName, setPetName] = useState(petData.name);
    const [breed, setBreed] = useState(petData.breed);
    const [species, setSpecies] = useState(petData.species);
    const [description, setDescription] = useState(petData.description);
    const [date_last_seen, setDate_Last_Seen] = useState(petData.date_last_seen);
    const [address, setAddress] = useState(petData.address)
    const [image, setImage] = useState<Blob>(petData.image);

    const showCardStyle = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '25%',
        height: '50%',
        border: '2px solid #000',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: "white",
    }

    const editCardStyle = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 550,
        height: 450,
        border: '2px solid #000',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        columnGap: '10px',
        bgcolor: "white",
        maxWith: 'sm',

    }

    const editPetCard = async () => {
        //clone the state
        let stateToChangeAndUpdate = petsArray;
        
        //update the animal
        
        const editedAnimal = {
            name: petName,
            breed: breed,
            species: species,
            description: description,
            date_last_seen: date_last_seen,
            address: address,
        }

        const newEditedAnimal = {
            ...petData,
            ...editedAnimal
        }
        
        console.log('edited animal to be added', newEditedAnimal)
        //make a call to the backend to update the animal
        stateToChangeAndUpdate = await axios.patch(`/api/v1/pets/${petData._id}`, newEditedAnimal)
        console.log(stateToChangeAndUpdate.data, 'this is the state to change and update')
        setPetsInfoArray(stateToChangeAndUpdate.data);
        setEditButtonClicked(false);
    }

    const deletePetCard = async () => {
        let text = "Are you sure you want to delete this pet from the entire database?";
        if(confirm(text) === true){
            let stateToChangeAndUpdate = petsArray;
            const deletedPet = petData;
            stateToChangeAndUpdate = await axios.delete(`/api/v1/pets/${deletedPet._id}`)
            setPetsInfoArray(stateToChangeAndUpdate.data)
          text = "Pet Deleted!"  
        } else text = "Cancelled"
        setEditButtonClicked(false);
    }

    if (!editButtonClicked){
        return (
            <>
            <Modal
            open={setShowPetCard}>
                <Box sx={showCardStyle}> 
                <div className = "title">
                    {image ? 
                    <img 
                        src={`data:image/jpeg;base64,${image}`}
                        width={'100%'}
                        height={'25%'}  
                    />
                    : <p>Loading image...</p>}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '10px' }}>
                    <Typography variant="h5">{petName} </Typography>
                    <Typography variant="h6">{breed} - {species}</Typography>
                    </div>
                    {/* //need to add logic for owner and image */}
                    <div className = "form" style={{ textAlign: 'center' }}>
                        {/* Breed Field */}
                        <Typography>{description}</Typography>
                        <Typography><strong>Last Seen on: </strong>{date_last_seen.toString()}</Typography>
                        <Typography><strong>Last Seen at: </strong>{address}</Typography>
                        {/*Location Last Seen Field */}

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button variant='contained' onClick={() => setEditButtonClicked(true)}>Edit Pet Info</Button>
                        <Button variant='contained' onClick={() => deletePetCard()}>Delete Entry </Button>
                        <Button variant="contained" onClick={() => setShowPetCard(false)}>Go Back</Button>
                    </div>
                </div>
                </Box>
            </Modal>
            </>
            );
    } else {
        return (
            <>
            <Modal
            open={setShowPetCard}>
                <Box sx={editCardStyle}> 
                <div className = "form">
                {/* Date Last Seen Field */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label="Date Last Seen" 
                    // @ts-ignore
                    renderInput={(params) => <TextField {...params}/>}
                    //@ts-ignore
                    onChange={(newValue) => setDate_Last_Seen(newValue.$d)} 
                    />
                </LocalizationProvider>

                {/* Species Selector Field */}
                <InputLabel id="species-label">Species</InputLabel>
                <Select fullWidth onChange={(e) => setSpecies(e.target.value)}>
                    <MenuItem value={'Dog'}>Dog</MenuItem>
                    <MenuItem value={'Cat'}>Cat</MenuItem>
                </Select>

                {/* Breed Field */}
                <TextField fullWidth label='Breed' variant='filled' defaultValue = {breed} onChange={e => setBreed(e.target.value)}></TextField>

                {/*Location Last Seen Field */}
                <TextField fullWidth label='Address' defaultValue = {address} variant='filled' onChange={e => setAddress(e.target.value)}></TextField>

                {/* petname field */}
                <TextField fullWidth label="Name" variant='filled' defaultValue = {petName} onChange={e => setPetName(e.target.value)}></TextField>

                {/* Description Field */}
                <TextField fullWidth label="Description" variant='filled' defaultValue = {description} onChange={e => setDescription(e.target.value)}></TextField>

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