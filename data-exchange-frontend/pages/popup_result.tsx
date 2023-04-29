import { Box, Button, Dialog, DialogContent, DialogTitle, Icon } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import React from 'react';

type PopupProps = {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  status: boolean;
};

export default function Popup_Result(props: PopupProps) {
  const { title, children, openPopup, setOpenPopup, status } = props;

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
    if ((reason && reason === "backdropClick") || (reason && reason === "escapeKeyDown")) {
      return;
    }
    setOpenPopup(false);
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <Box mr={1}>
          <Icon sx={{ fontSize: 20 }} color={status ? 'success' : 'error'}>
            {status ? <DoneIcon /> : <PriorityHighIcon />}
          </Icon>
        </Box>
        {title}
      </DialogTitle>
      <DialogContent sx={{ lineHeight: 2 }}>
      {typeof children === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br>') }} />
        ) : (
          children
        )}
      </DialogContent>
      <Button onClick={(event) => handleClose(event, "close")}>Close</Button>
    </Dialog>
  );
}