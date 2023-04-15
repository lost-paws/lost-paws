/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from "dayjs"

const style = {
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
    bgcolor: "white"
}


// @ts-ignore
const AddPetModal = (props) => {

    
    const [petName, setPetName] = useState<string>('');
    const [lastLocation, setLastLocation] = useState<string>('')
    const [species, setSpecies] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [breed, setBreed] =  useState<string>('')
    const [lastSeen, setLastSeen] = useState<any>(null)
    const [file, setFile] = useState<Blob | null>(null);

// @ts-ignore
    const addAnimaltoDataBase = async () => {
        console.log('we are in addAnimalToDatabase');
        if (!file || !lastSeen) {
            alert('Select an image of your pet to submit')
            return;
        }
        const formData = new FormData();
        formData.append('file', file)
        formData.append('name', petName);
        formData.append('species', species);
        formData.append('breed', breed);
        formData.append('date_last_seen', lastSeen.$d);
        formData.append('address', lastLocation);
        formData.append('description', description);

        try {
            const response = await PetsFinder.post('/', formData)
        } catch (error) {
            console.log(error)
        }

        
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
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
                    onChange={
                        (newValue) => {
                        setLastSeen(newValue)
                    }
                    } 
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
                <form>
                    <input type='file' onChange={handleFileChange}/>
                </form>


            </div>
            <div className = "footer">
                <Button variant="contained" onClick={() => addAnimaltoDataBase()}>Submit</Button>
                <Button variant="contained" onClick={() => props.setOpenModal(false)}>Cancel</Button>
            </div>
            </Box>
        </Modal>
        
    );
}

export default AddPetModal;