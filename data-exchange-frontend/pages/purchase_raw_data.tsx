import NavBar from './navbar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { ethers } from 'ethers';
import { contractAddress } from '@/src/address';
import abi from "../src/data_transaction.json";
import { Constants } from "../Constants";
import Web3 from 'web3';
declare const window: any;

// const data = [
//   { name: 'Data 1', price: 10, category: 'A', description: 'abc' },
//   { name: 'Data 2', price: 20, category: 'B', description: 'def' },
//   { name: 'Data 3', price: 30, category: 'C', description: 'ddfds' },
//   { name: 'Data 4', price: 40, category: 'D', description: '1dsd' },
//   { name: 'Data 5', price: 80, category: 'C', description: 'Pokemon testing' },
// ];

interface data {
  name: string;
  price: number;
  description: string;
}

export default function Purchase_Raw_Data() {
  const Web3 = require("web3")
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [priceFilter, setPriceFilter] = useState('All prices');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dataList, setData] = useState<data[]>([]);

  // Filter table data based on search query, category filter, and price filter
  const filteredData = dataList.filter((row) => {
     const name = row.name.toLowerCase();
     const query = searchQuery.toLowerCase();
    //const category = row.category.toLowerCase();

  //   // Check if the row matches the search query, category filter, and price filter
    // return (
    //   (name.includes(query) || category.includes(query)) &&
    //   (categoryFilter === 'All categories' || category === categoryFilter.toLowerCase()) &&
    //   (priceFilter === 'All prices' || (priceFilter === 'Under $50' && row.price < 50) || 
    //   (priceFilter === 'Between $50 and $100' && row.price >= 50 && row.price <= 100) || 
    //   (priceFilter === 'Over $100' && row.price > 100))
    // );
    return (
      (name.includes(query)) &&
      (categoryFilter === 'All categories') &&
      (priceFilter === 'All prices' || (priceFilter === 'Under $50' && row.price < 50) || 
      (priceFilter === 'Between $50 and $100' && row.price >= 50 && row.price <= 100) || 
      (priceFilter === 'Over $100' && row.price > 100))
    );
  });


  //load the table data
  useEffect(() => {
      (async () => {
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
        
        const transaction = await dataExchange.view_raw_data_id_list()
        console.log("Transaction length",transaction.length)
        const a_list = []
        for (let i = 0; i < transaction.length; i++){
          const result = await dataExchange.retrieve_raw_data_info([i])
          a_list.push(result)
        }
        
        //reduce method to accumulate transposed value
        const b_list = a_list.reduce((acc, curr) => {
          curr.forEach((element: any, i: string | number) => {
            //check if initialized
            if (acc[i] === undefined) {
              acc[i] = [element];
            } else {
              if (curr[i] === undefined) {
                acc[i].push(undefined);
              } else {
                acc[i].push(element);
              }
            }
          });
          return acc;
        }, []);

        //fit the b_list array to dataList (data[])
        const c_list: data[] = b_list[0].map((_, i: number) => ({
          name: b_list[0][i].toString(),
          price: b_list[1][i].toString(),
          description: b_list[2][i].toString(),
        }));
        
        setData(c_list)
        console.log("DataList", dataList)

        setIsProcessing(false);
        return Constants.MESSAGE_TRASACTION_UPLOAD_SUCCESSFULLY
      })();
  },[]);

  const purchase = useCallback(async (index: number) => {

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
      try {
        const price = filteredData[index].price
        console.log("price is ", price)
        const tx = await dataExchange.purchaseData(index, {
          value: price,
        })
        console.log(tx)
        alert("Please wait until a pop up dialog indicate purchase is successful.")

        const result = await tx.wait()
        console.log(result)

        const dataTx = await dataExchange.view_purchased_raw_data(index)
        alert("You have successfully purchase the data. The data hash is\n"+ dataTx)
      } 
      catch(e) {
        console.error(e,index)
        window.alert(`${e}`)
      }
    },
    []
  )
  


  return (
    <>
      <NavBar />
      <h1>Purchase ML Data</h1>

      <Box
        m={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="All categories">All categories</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="price-filter-label">Price</InputLabel>
          <Select
            labelId="price-filter-label"
            id="price-filter"
            value={priceFilter}
            label="Price"
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <MenuItem value="All prices">All prices</MenuItem>
            <MenuItem value="Under $50">$0-$50</MenuItem>
            <MenuItem value="Between $50 and $100">$50-$100</MenuItem>
            <MenuItem value="Over $100">$100+</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell><Button onClick={() => purchase(index)}>Purchase Now</Button></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Loading data...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

function preventDefault() {
  throw new Error('Function not implemented.');
}