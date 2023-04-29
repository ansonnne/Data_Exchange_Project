import { Box, CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

type PopupProps = {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Popup(props: PopupProps) {
  const { title, children, openPopup, setOpenPopup } = props;

  const handleClose = (event, reason) => {
    if ((reason && reason == "backdropClick") || (reason && reason == "escapeKeyDown")) 
        return;
    setOpenPopup(false);
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: 20, color: '#2F1C6A', display: 'flex', alignItems: 'center' }}>
        <Box mr={1}>
          <CircularProgress size={22} color="secondary" />
        </Box>
        {title}</DialogTitle>
      <DialogContent sx={{ fontSize: 16 }}>{children}</DialogContent>
    </Dialog>
  );
}