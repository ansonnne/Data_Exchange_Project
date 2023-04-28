import NavBar from './navbar'
import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import abi from "../src/data_transaction.json";
import { contractAddress } from "../src/address";
import { ethers } from "ethers";
import { Button, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { Constants } from "../Constants";
declare const window: any;

export default function Upload() {
  const Web3 = require("web3")
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    const address = sessionStorage.getItem("wallet");
    if (address) {
      setAddress(address);
    }
  }, [])

  const categories = [
    {
      value: 'Consumer',
      label: 'Consumer',
    },
    {
      value: 'Big Data',
      label: 'Big Data',
    },
    {
      value: 'Technology',
      label: 'Technology',
    },
    {
      value: 'Business Analytics',
      label: 'Business Analytics',
    },
    {
      value: 'Human Resource',
      label: 'Human Resource',
    },
    {
      value: 'Marketing',
      label: 'Marketing',
    },
    {
      value: 'Sales',
      label: 'Sales',
    },
    {
      value: 'Supply Chain',
      label: 'Supply Chain',
    },
    {
      value: 'Others',
      label: 'Others',
    }
  ];

  

  const uploadData = async (data_hash: String, data_name: String, price: Number, purchase_Ml: boolean, data_desc: String) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const dataExchange = new ethers.Contract(
      contractAddress,
      abi.abi,
      signer
    );

    console.log(dataExchange)

    setIsProcessing(true);
    //event.preventDefault();

    try {
      //let fromAddress = await validateInputAddress(inputAddress);
      console.log("data_hash, dataName,price, purchaseMl,dataDesc,", data_hash, data_name, price, purchase_Ml, data_desc);

      const transaction = await dataExchange.uploadData(data_hash, data_name, price, purchase_Ml, data_desc)
      console.log(transaction)
      alert("Please wait until a pop up dialog indicate data is uploaded")

      const result = await transaction.wait()
      console.log(result)
      alert("Data uploaded sucessfully")

      setIsProcessing(false);
      return Constants.MESSAGE_TRASACTION_UPLOAD_SUCCESSFULLY
    }
    catch (error) {
      setIsProcessing(false);
      console.log(error)
      return Constants.MESSAGE_TRASACTION_GENERAL_ERROR
    }
  }

  const [dataHash, setDataHash] = useState('');
  const [dataName, setDataName] = useState('');
  const [dataPrice, setPrice] = useState(0);
  const [dataCategory, setCategory] = useState("Others")
  const [dataPurchaseMl, setPurchaseMl] = useState(false);
  const [dataDesc, setDataDesc] = useState('');

  const DataNameInput = async (event) => {
    setDataName(event.target.value);
  };
  const DataHashInput = async (event) => {
    setDataHash(event.target.value);
  };
  const DataPriceInput = async (event) => {
    setPrice(event.target.value);
  }
  const DataCategoryInput = async (event) => {
    setCategory(event.target.value);
  }
  const DataPurchaseMlInput = async (event) => {
    setPurchaseMl(event.target.value);
  }
  const DataDescInput = async (event) => {
    setDataDesc(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    uploadData(dataHash, dataName, dataPrice, dataPurchaseMl, dataDesc);
    //setDataHash('');
  };
  return (
    <>
      <NavBar />
      <h1>Upload</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Name</InputLabel>
          <OutlinedInput
            id="nameInput"
            label="Data Name"
            type='text'
            value={dataName}
            onChange={DataNameInput}
            autoFocus
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Hash</InputLabel>
          <OutlinedInput
            id="hashInput"
            label="Data Hash"
            type='text'
            value={dataHash}
            onChange={DataHashInput}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price (in wei)</InputLabel>
          <OutlinedInput
            id="priceInput"
            label="Price (in wei)"
            type="number"
            value={dataPrice}
            onChange={DataPriceInput}
          />
        </FormControl>

        <TextField
          id="categoryInput"
          select
          label="Select"
          value={dataCategory}
          onChange={DataCategoryInput}
          defaultValue="Others"
          helperText="Please select the data category"
          fullWidth
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Data Description</InputLabel>
          <OutlinedInput
            id="descriptionInput"
            label="Data Description"
            type='text'
            value={dataDesc}
            onChange={DataDescInput}
            multiline
            rows={4}
          />

        <FormControl>
          <FormControlLabel control={<Checkbox />} label="Purchase ML Service" value={dataPurchaseMl} onChange={DataPurchaseMlInput} />
        </FormControl>

          <Button type="submit">Upload Data</Button>
        </FormControl>

      </Box>

    </>
  )
}


function preventDefault() {
  throw new Error('Function not implemented.');
}

  
