import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from '@mui/material';
import { NextResponse, NextRequest } from 'next/server';
//import cookie from "js-cookie";

export default function NavBar(req: NextRequest, res: NextResponse) {
  const [address, setAddress] = useState<string>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const address = sessionStorage.getItem("wallet");
    if (address) {
      setAddress(address);
    }
  }, []);

  const isLoggedIn = useMemo(()=>{
    if (address) {
      return true;
    }
    return false;
  }, [address])


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
    //cookie.set("UserAddress",accounts[0], {expires: 1/24})
    sessionStorage.setItem("wallet", accounts[0])
  }, []);

  const logOut = () => {
    //cookie.remove('UserAddress');
    sessionStorage.removeItem("wallet");
    setAddress("");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', borderBottom:1,borderColor:'grey.500'}}>
        <a href="/"><MenuItem sx={{ borderRadius: 2 }}>Home</MenuItem></a>
        <a href="dashboard"><MenuItem sx={{ borderRadius: 2 }}>Dashboard</MenuItem></a>
        <a href="upload"><MenuItem sx={{ borderRadius: 2 }}>Upload</MenuItem></a>
        <a href="activate"><MenuItem sx={{ borderRadius: 2 }}>Activate</MenuItem></a>
        <a href="purchase_raw_data"><MenuItem sx={{ borderRadius: 2 }}>Purchase Data</MenuItem></a>
        <a href="purchase_ml_data"><MenuItem sx={{ borderRadius: 2 }}>Purchase ML Data</MenuItem></a>
        <Tooltip title="Account" className="Avatar">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            className="Avatar"
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div>
          {isLoggedIn ? (
          <div>
            <MenuItem>Address: {address}</MenuItem>
            <MenuItem><Button fullWidth={true} onClick={logOut} style={{ maxWidth: '500px', maxHeight: '500px', minWidth: '30px', minHeight: '30px'}}>Log Out</Button></MenuItem>
          </div>
          ) :
          (<Button onClick={connectToTheMetaMask}>Login</Button>)
          }
        </div>
      </Menu>
    </React.Fragment>
  );
}