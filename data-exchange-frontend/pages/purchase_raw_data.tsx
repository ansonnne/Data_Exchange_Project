import NavBar from './navbar';
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const data = [
  { name: 'Data 1', price: 10, category: 'A' },
  { name: 'Data 2', price: 20, category: 'B' },
  { name: 'Data 3', price: 30, category: 'C' },
  { name: 'Data 4', price: 40, category: 'D' },
  { name: 'Data 5', price: 80, category: 'C' },
];

export default function Purchase_Raw_Data() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [priceFilter, setPriceFilter] = useState('All prices');

  // Filter table data based on search query, category filter, and price filter
  const filteredData = data.filter((row) => {
    const name = row.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    const category = row.category.toLowerCase();

    // Check if the row matches the search query, category filter, and price filter
    return (
      (name.includes(query) || category.includes(query)) &&
      (categoryFilter === 'All categories' || category === categoryFilter.toLowerCase()) &&
      (priceFilter === 'All prices' || (priceFilter === 'Under $50' && row.price < 50) || (priceFilter === 'Between $50 and $100' && row.price >= 50 && row.price <= 100) || (priceFilter === 'Over $100' && row.price > 100))
    );
  });

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
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.category}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}