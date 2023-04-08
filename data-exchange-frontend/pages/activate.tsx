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

export default function Activate() {
    return (
      <>
        <NavBar />
        <h1>Activate</h1>

        <Box
      component="form"
      noValidate
      autoComplete="off"
    >
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Hash</InputLabel>
          <OutlinedInput
            id="hashInput"
            label="Data Hash"
            autoFocus
          />
        </FormControl>

        <FormControl>
          <Button type="submit">Upload Data</Button>
          <Button type="submit">Check ML Status</Button>
        </FormControl>
        
    </Box>
      </>
    );
  }
  