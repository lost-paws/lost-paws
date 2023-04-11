import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PetsFinder from '../apis/PetsFinder';

const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 500,
    border: '2px solid #000',
    display: 'flex',
    flexDirection: 'column',
    columnGap: '10px'
}


// @ts-ignore
const AddPetModal = (props) => {

    
    const [petName, setPetName] = useState('');
    const [lastLocation, setLastLocation] = useState('')
    const [species, setSpecies] = useState('')
    const [description, setDescription] = useState('')
    const [breed, setBreed] =  useState('')
    const [lastSeen, setLastSeen] =  useState(null)

// @ts-ignore
    const addAnimaltoDataBase = async () => {
        const reqBody = {
            //username: username
            // @ts-ignore
            date_last_seen: lastSeen.$d,
            loc_last_seen: lastLocation,
            species: species,
            breed: breed,
            description: description,
            name: petName
        }

        try {
            const response = await PetsFinder.post('/', {
                method: 'post',
                url: '/',
                data: reqBody
            })
        } catch (error) {
            console.log(error)
        }

        
    }

    return (
        // @ts-ignore
        <Modal
        open={props.openState}
        >
            <Box sx={style}>
            <div className = "title">
                <h1>Enter your pet information.</h1>
            </div>
            <div className = "form">
                {/* Date Last Seen Field */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label="Date Last Seen" 
                    // @ts-ignore
                    renderInput={(params) => <TextField {...params}/>} 
                    value={lastSeen} 
                    onChange={(newValue) => setLastSeen(newValue)} 
                    />
                </LocalizationProvider>

                {/* Species Selector Field */}
                <InputLabel id="species-label">Species</InputLabel>
                <Select fullWidth value={species} onChange={(e) => setSpecies(e.target.value)}>
                    <MenuItem value={'Dog'}>Dog</MenuItem>
                    <MenuItem value={'Cat'}>Cat</MenuItem>
                </Select>

                {/* Breed Field */}
                <TextField fullWidth label='Breed' variant='filled' onChange={e => setBreed(e.target.value)}></TextField>

                {/*Location Last Seen Field */}
                <TextField fullWidth label='Location Last Seen' variant='filled' onChange={e => setLastLocation(e.target.value)}></TextField>

                {/* petname field */}
                <TextField fullWidth label='Pet Name' variant='filled' onChange={e => setPetName(e.target.value)}></TextField>

                {/* Description Field */}
                <TextField fullWidth label='Description' variant='filled' onChange={e => setDescription(e.target.value)}></TextField>


            </div>
            <div className = "footer">
                <button onClick={() => addAnimaltoDataBase()}>Submit</button>
                <button onClick={() => props.setOpenModal(false)}>Cancel</button>
            </div>
            </Box>
        </Modal>
        
    );
}

export default AddPetModal;