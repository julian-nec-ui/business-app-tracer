"use client";

import { useState } from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Delete from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function IconMenu({ columnId, jobAppId, onClose }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const MENU_ITEM_BACKGROUND = "#E1F9FA";

  const handleClick = (event) => {
    console.log("Column ID:", columnId);
    console.log("Job Application ID:", jobAppId);
    setAnchorEl(event.currentTarget);
    setOpen(false); // Close the menu after clicking an item  
    onClose(false); // Close the parent menu when an item is clicked
  };

  const handleClose = (e) => {
    setOpen(false);
  }

  return (
    <MenuList id="customized-menu" className='flex-col gap-1' sx={{ minWidth: 217 }}
      anchorel={anchorEl}
      open={open}
      onBlur={handleClose}
      onClose={onClose}
    >
      <MenuItem
        onClick={(e) => handleClick(e)}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: MENU_ITEM_BACKGROUND,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText fontSize="small">
          Copy
        </ListItemText>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          ⌘C
        </Typography>
      </MenuItem>

      <MenuItem
        onClick={(e) => handleClick(e)}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: MENU_ITEM_BACKGROUND,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <ListItemIcon>
          <ContentCut fontSize="small" />
        </ListItemIcon>
        <ListItemText fontSize="small">
          Cut
        </ListItemText>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ⌘X
        </Typography>
      </MenuItem>

      <MenuItem
        onClick={(e) => handleClick(e)}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: MENU_ITEM_BACKGROUND,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <ListItemText fontSize="small">
          Paste
        </ListItemText>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ⌘V
        </Typography>
      </MenuItem>
      
      <Divider sx={{ bgcolor: ['#000000'] }} />

      <MenuItem
        onClick={(e) => handleClick(e)}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: MENU_ITEM_BACKGROUND,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <ListItemIcon>
          <BorderColorIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText fontSize="small">
          Edit
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={(e) => handleClick(e)}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: MENU_ITEM_BACKGROUND,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <ListItemIcon>
          <PreviewIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          View
        </ListItemText>
      </MenuItem>

      <Divider sx={{ bgcolor: ['#000000'] }} />

      <MenuItem
        onClick={(e) => handleClick(e)}
        sx={{
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: MENU_ITEM_BACKGROUND,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <ListItemIcon>
          <Delete fontSize="small" style={{ color: '#ED1708' }} />
        </ListItemIcon>
        <ListItemText fontSize="small" className='text-[#ED1708]'>
          Delete
        </ListItemText>
      </MenuItem>
    </MenuList>
  );
}
