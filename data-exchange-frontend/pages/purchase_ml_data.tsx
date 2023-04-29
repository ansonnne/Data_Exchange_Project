import NavBar from './navbar'
import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import Popup_Result from './popup_result';
import { useState } from 'react';

export default function Purchase_ML_Data() {
  const [showingResult, setshowingResult] = useState(false);
  const [resultTitle, setResultTitle] = useState("");
  const [resultContent, setResultContent] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setshowingResult(true)
    setResultTitle("Purchase Successfully")
    setResultContent("Your API key is <br> e2481b80081a4ac193f8d4b421f00321")
  };
    return (
      <>
        <NavBar />
        <h1>Purchase ML Data</h1>

        <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Hash</InputLabel>
          <OutlinedInput
            id="hashInput"
            label="Data Hash"
            autoFocus
          />

          <Button type="submit">Upload Data</Button>
        </FormControl>
        
        <div>
      {showingResult && (
        <Popup_Result title={resultTitle} openPopup={true} setOpenPopup={setshowingResult} status={true}>
          {resultContent}
        </Popup_Result>
      )}
    </div>
    </Box>
      </>
    );
  }
  