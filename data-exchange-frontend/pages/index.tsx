import NavBar from './navbar'
import abi from "../src/data_transaction.json"
import { contractAddress } from "../src/address"
import { ethers } from "ethers";
//import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function Index() {
  const [address, setAddress] = useState<string>();
  const [id_list, setID] = useState();
  //const userAddress = getCookie('UserAddress')

  useEffect(() => {
    const address = sessionStorage.getItem("wallet");
    if (address) {
      setAddress(address);
    }
  }, []);

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



  return (
    <>
      <NavBar />
      <h1>Data Exchange Platform</h1>
      <p>Address: {address}</p>
      <p>Data Exchange is a decentralized ...</p>
      <h3>To start with, please click the "LOGIN" button inside the user icon at the top of the navigation bar.</h3>
      
    </>
  );
}