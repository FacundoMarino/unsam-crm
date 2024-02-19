import React, { useEffect, useState } from 'react';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCrmPage } from '../../store/crm/crmSlider';

export const SideBarItem = ({ title = '', icon }) => {
  const rol = useSelector((state) => state.auth.rol);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([]);

  const subItems = [
    'Servicios',
    'Turnos',
    'Formularios',
    'Bandeja de Solicitudes',
  ];
  const subItemsExternal = [
    'Servicios',
    'Turnos',
    'Formularios',
    'Bandeja de Solicitudes',
    'Reportes',
    'FAQ',
  ];

  useEffect(() => {
    if (rol !== 'Admin') {
      setItems(subItems);
    } else {
      setItems(subItemsExternal);
    }
  }, [rol]);

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
        {items.map((subItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() =>
                dispatch(setCrmPage(subItem.toLowerCase().replace(/\s/g, '')))
              }
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
