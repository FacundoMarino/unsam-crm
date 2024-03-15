import { useDispatch, useSelector } from 'react-redux';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import {
  Grid,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Icon,
} from '@mui/material';
import { startLogout } from '../../store/auth/thunks';
import { FaRegUser } from 'react-icons/fa';
import { FaRegHandshake } from 'react-icons/fa6';
import { FaRegFolderOpen } from 'react-icons/fa';
import { FaQuestionCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { setCrmPage } from '../../store/crm/crmSlider';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoMdAnalytics } from 'react-icons/io';

export const Navbar = ({ draweWidth }) => {
  const dispatch = useDispatch();
  const rol = useSelector((state) => state.auth.rol);

  const name = useSelector((state) => state.auth.name);
  const page = useSelector((state) => state.crm.page);

  const [nameBar, setNameBar] = useState({});

  const onLogout = () => {
    dispatch(startLogout());
  };

  useEffect(() => {
    handlerPage();
  }, [page]);

  const handlerPage = () => {
    if (page === 'servicios') {
      setNameBar({ name: 'Servicios', icon: <FaRegHandshake /> });
    } else if (page === 'milegajo') {
      setNameBar({
        name: rol === 'Admin' ? 'Legajo' : 'Mi Legajo',
        icon: <FaRegFolderOpen />,
      });
    } else if (page === 'faq') {
      setNameBar({ name: 'FAQ', icon: <FaQuestionCircle /> });
    } else if (page === 'turnos') {
      setNameBar({ name: 'Turnos', icon: <FaCalendarAlt /> });
    } else if (page === 'formularios') {
      setNameBar({ name: 'Formularios', icon: <IoNewspaperOutline /> });
    } else if (page === 'reportes') {
      setNameBar({ name: 'Reportes', icon: <IoMdAnalytics /> });
    } else if (page === 'usuarios') {
      setNameBar({ name: 'Usuarios', icon: <FaRegUser /> });
    }
  };

  return (
    <AppBar
      position="fixed"
      color="banckgroundCrm"
      sx={{
        width: { sm: ` calc(100% - ${draweWidth}px)` },
        ml: { sm: `${draweWidth}px)` },
      }}
    >
      <Toolbar sx={{ backgroundColor: '#ffffff' }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="white"
          ></Typography>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: 'flex', flexDirection: 'column' }}
            onClick={() => dispatch(setCrmPage('milegajo'))}
          >
            <FaRegUser />
            <Typography sx={{ fontSize: '0.8rem' }}>{name}</Typography>
          </IconButton>
          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          alignItems="center"
          sx={{ marginLeft: '15%' }}
        >
          <Icon sx={{ color: 'white', height: '40px', marginTop: '10px' }}>
            {nameBar.icon}
          </Icon>
          <Typography variant="h6" sx={{ marginLeft: '1rem' }} color="white">
            {nameBar.name}
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
