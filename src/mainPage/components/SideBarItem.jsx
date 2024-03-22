import React, { useEffect, useState } from 'react';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Icon,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCrmPage } from '../../store/crm/crmSlider';
import { FaRegHandshake } from 'react-icons/fa6';
import { FaRegFolderOpen } from 'react-icons/fa';
import { FaQuestionCircle } from 'react-icons/fa';
import { LuUser2 } from 'react-icons/lu';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoMdAnalytics } from 'react-icons/io';

export const SideBarItem = ({ title = '', icon }) => {
  const rol = useSelector((state) => state.auth.rol);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([]);

  const subItems = [
    { name: 'Servicios', icon: <FaRegHandshake /> },
    { name: 'Mi Legajo', icon: <FaRegFolderOpen /> },
    { name: 'FAQ', icon: <FaQuestionCircle /> },
  ];
  const subItemsInternal = [
    { name: 'Usuarios', icon: <LuUser2 /> },
    { name: 'Servicios', icon: <FaRegHandshake /> },
    { name: 'Turnos', icon: <FaCalendarAlt /> },
    { name: 'Formularios', icon: <IoNewspaperOutline /> },
    { name: 'Reportes', icon: <IoMdAnalytics /> },
    { name: 'FAQ', icon: <FaQuestionCircle /> },
  ];

  useEffect(() => {
    if (rol === 'Externo') {
      setItems(subItems);
    } else {
      setItems(subItemsInternal);
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
            <Icon
              sx={{
                color: 'white',
                marginRight: '10px',
                height: '45px',
                marginTop: '15px',
              }}
            >
              {icon}
            </Icon>
          </ListItemIcon>
          <Grid container>
            <ListItemText
              sx={{
                color: 'white',
                fontSize: '1.2rem',
              }}
              primary={title}
            />
          </Grid>
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {items.map((subItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              alignItems="flex-start"
              onClick={() =>
                dispatch(
                  setCrmPage(subItem.name.toLowerCase().replace(/\s/g, '')),
                )
              }
            >
              <Icon
                sx={{ color: 'white', marginRight: '10px', height: '45px' }}
              >
                {subItem.icon}
              </Icon>
              <ListItemText
                className="animate__animated animate__fadeIn animate__faster"
                sx={{ color: 'white' }}
                primary={subItem.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>
    </div>
  );
};
