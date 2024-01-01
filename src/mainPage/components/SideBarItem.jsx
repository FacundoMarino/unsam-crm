import React, { useState } from 'react';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCrmPage } from '../../store/crm/crmSlider';

export const SideBarItem = ({ title = '', subItems = [], icon }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  subItems = ['Turnos', 'Formularios'];

  const handleItemClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton onClick={handleItemClick}>
          <ListItemIcon style={{ minWidth: 'auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'white',
                marginRight: '10px',
                width: 'auto',
              }}
            >
              {icon}
            </div>
          </ListItemIcon>
          <Grid container>
            <ListItemText sx={{ color: 'white' }} primary={title} />
          </Grid>
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {subItems.map((subItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => dispatch(setCrmPage(subItem.toLowerCase()))}
            >
              <ListItemText
                className="animate__animated animate__fadeIn animate__faster"
                sx={{ color: 'white' }}
                primary={subItem}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>
    </div>
  );
};
