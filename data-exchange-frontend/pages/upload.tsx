import NavBar from './navbar'
import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import abi from "../src/data_transaction.json";
import { contractAddress } from "../src/address";
import { ethers } from "ethers";
import { Button } from '@mui/material';


export default function Upload() {

  const categories = [
    {
      value: 'A',
      label: 'A',
    },
    {
      value: 'B',
      label: 'B',
    },
    {
      value: 'C',
      label: 'C',
    },
    {
      value: 'D',
      label: 'D',
    },
  ];

  const uploadData = async (data_hash: String, dataName:String,price: Number, purchaseMl: boolean, dataDesc:String,inputAddress?: String) => {
    const DataExchange = new ethers.Contract(
      contractAddress,
      abi.abi,
    );
      
    

  }


    return (
      <>
        <NavBar />
        <h1>Upload</h1>
        <Box
      component="form"
      onSubmit={uploadData}
      noValidate
      autoComplete="off"
      
    >
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Name</InputLabel>
          <OutlinedInput
            id="nameInput"
            label="Data Name"
            autoFocus
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Hash</InputLabel>
          <OutlinedInput
            id="hashInput"
            label="Data Hash"
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price (in wei)</InputLabel>
          <OutlinedInput
            id="priceInput"
            label="Price (in wei)"
          />
        </FormControl>

        {/* <TextField
          id="categoryInput"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select the data category"
          fullWidth
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Description</InputLabel>
          <OutlinedInput
            id="descriptionInput"
            label="Data Description"
            multiline
            rows={4}
          />
          <Button type="submit">Upload Data</Button>
        </FormControl>
        
    </Box>
    
      </>
    )
  }
  