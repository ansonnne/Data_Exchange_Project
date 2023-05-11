import NavBar from './navbar'
import abi from "../src/data_transaction.json"
import { contractAddress } from "../src/address"
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import {createTheme, ThemeProvider,Typography,} from "@mui/material";
import Image from 'next/image';
import { Box, Stack } from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import Popup_Result from './popup_result';

//Central styling session
const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body1",
          },
          style: {
            fontSize: 14,
          },
        },
        {
          props: {
            variant: "body1",
          },
          style: {
            fontSize: 9,
          },
        },
      ],
    },
  },
});


//Prerequisites for the Item List under 'About the Company'
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//check user has MetaMasked installed
interface CustomWindow extends Window {
  ethereum?: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Index() {
  const [address, setAddress] = useState<string>();
  const [id_list, setID] = useState();
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(true);
  const [showingResult, setshowingResult] = useState(false);


  //warning message if user's browser has no MetaMask installed
  useEffect(() => {
      const windowWithEthereum = window as CustomWindow;
      if (typeof windowWithEthereum.ethereum !== 'undefined') {
        setIsMetaMaskInstalled(true);
      } else {
        setIsMetaMaskInstalled(false);
      }

    if (isMetaMaskInstalled === false) {
      setshowingResult(true)
    }
    console.log("installed",isMetaMaskInstalled)
  }, []);

  useEffect(() => {
    const address = sessionStorage.getItem("wallet");
    if (address) {
      setAddress(address);
    }
  }, [isMetaMaskInstalled]);

  const getBalance = async () => {
    if (provider === null) return;
    const lotteryContract = new ethers.Contract(
      contractAddress,
      abi.abi,
      provider
    );
    const id = await lotteryContract.view_raw_data_id_list();
    setID(id);
  };

  const signer = useMemo(() => {
    if (!address) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [address]);
  
  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }, []);


  const connectToTheMetaMask = useCallback(async () => {
    // check if the browser has MetaMask installed
    if (!(window as any).ethereum) {
      alert("Please install MetaMask first.");
      return;
    }
    // get the user's account address
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
  }, []);

  //Prerequisite for Item list under 'About the Company'
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [value1, setValue1] = React.useState(1);

  const handleChange1 = (event: React.SyntheticEvent, newValue1: number) => {
    setValue1(newValue1);
  };


  return (
    <>
      <NavBar />

      <Box sx={{width: '100%', boxshadow: 2}}>
        <Image src="/Purple_4.png" alt="Image Not Found" layout="responsive" width={500} height={500} />
      </Box>
      <Box sx={{boxshadow: 2, display: 'block', p: 1, m: 5}}>
        <ThemeProvider theme={theme}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" color="#2F1C6A">
                About Our Project
              </Typography>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Project Intro" {...a11yProps(0)} />
                <Tab label="Implementation Ideas" {...a11yProps(1)} />
                <Tab label="Teammates" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Typography variant='subtitle1' color="#251654">
                This is a decentralized data transaction platform providing medium for the exchange of valuabe raw datasets for our users to tap into the market value of their data. 
                Dataset sellers can upload their data stored in IPFS to our platform and claim the selling price through our smart contract. 
                
                We hope to leverage our expertise to generate valuable insights based on sellers&apos; data. 
                It depends on buyers&apos; needs to choose from different categories of datasets specialized for their businesses or personal use. 

                Our platform is powered by the usage of IPFS and smart contract which speeds up the transaction process and eliminates the need for us to maintain database. 
                To promote the best data transaction environment, we will dedicate our efforts towards regulation. 
                
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant='subtitle1'  color="#251654">
                We have a two-stage development plan for the regulation, with due diligence validation in IPFS at first. 
                The aim of our platform is to maximize the utilization of data across the globe which eventually facilitates the research and development process of new innovation. 
                By resource reallocation, data sellers are able to generate revenue and data buyers are able to create innovation for the benefits of the society. 
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography variant='subtitle1'   color="#251654">
                <ul>
                  <li>Anson</li>
                  <li>Hania</li>
                  <li>Jackson</li>
                  <li>Kelvin</li>
                  <li>Kenny</li>
                  <li>Yanni</li>
                </ul>
              </Typography>
            </TabPanel>
          </Stack>
        </ThemeProvider>
      </Box>
    
    <Box sx={{boxshadow: 2, display: 'block', p: 1, m: 5}}>
      <ThemeProvider theme={theme}>
        <Stack spacing={2}>
          <Typography variant="h4"   color="#251654">
            Product Introduction & Get Started!
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example 1">
              <Tab label="Raw data" {...a11yProps(0)} />
              <Tab label="Get Started!" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value1} index={0}>
            <Typography variant='subtitle1'  color="#251654">
              Our Data Exchange Platform offers selling and purchasing of raw datasets. If you wish sell your valuable dataset, please go to the data uploading page by clicking the &apos;Upload&apos; button to sell your data.
              If you wish to purchase raw datasets from our platform, please go to the &apos;Purchase Data&apos; page through the navigation portal on the top. You would be required to use Metamask for both purchasing and uploading data operation.
            </Typography>
          </TabPanel>
          <TabPanel value={value1} index={1}>
            <Typography variant='subtitle1'  color="#251654">
              Please click the A (Account) button on the top right corner of the webpage to login with your wallet address!
            </Typography>
          </TabPanel>
        </Stack>
      </ThemeProvider>
    </Box>


    <div>
      {showingResult && (
        <Popup_Result title={"Error Occurs"} openPopup={true} setOpenPopup={setshowingResult} status={false}>
          Please install MetaMask before loading this page
        </Popup_Result>
      )}
    </div>

    </>
  );
}