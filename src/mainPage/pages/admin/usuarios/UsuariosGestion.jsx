import {
  AppBar,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { UsuarioModal } from './UsuarioModal';
import {
  eliminarUsuario,
  verUsuario,
  verUsuarios,
} from '../../../../store/users/thunks';
import {
  setIndividualUser,
  setStatusUser,
} from '../../../../store/users/usersSlider';
export const UsuariosGestion = ({ setDisplayView, handleNewFormClick }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const user = useSelector((state) => state.users.individualUser);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verUsuarios({ telekinesis }));
    dispatch(setStatusUser(''));
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    dispatch(setIndividualUser([]));
  };
  const handlerNuevoServicio = () => {
    handleModalOpen();
  };

  const handleEliminar = (id) => {
    dispatch(eliminarUsuario({ telekinesis, id }));
    dispatch(setStatusUser('ok'));
  };

  const handleEditar = (id) => {
    dispatch(verUsuario({ telekinesis, id }));
    setEdit(true);
    handleModalOpen();
  };

  const handleRole = (rol) => {
    if (rol === 1) {
      return 'Administrador';
    } else if (rol === 2) {
      return 'Interno';
    } else if (rol === 4) {
      return 'Externo';
    } else if (rol === 3) {
      return 'Consultor';
    }
  };
  const handleVer = (id) => {
    handleNewFormClick(1);
    setDisplayView('');
    dispatch(verUsuario({ telekinesis, id }));
  };

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Usuarios
            </Typography>
            <Button
              color="inherit"
              onClick={handlerNuevoServicio}
              startIcon={<AddIcon />}
            >
              Nuevo Usuario
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {users?.map((servicio) => (
            <ListItem key={servicio.id} style={{ width: '94%' }}>
              <ListItemText primary={servicio.name} style={{ width: '1%' }} />
              <ListItemText
                primary={servicio.apellido}
                style={{ width: '1%' }}
              />
              <ListItemText
                primary={handleRole(servicio.rol)}
                style={{ width: '1%' }}
              />
              <ListItemText primary={servicio.email} style={{ width: '1%' }} />

              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleVer(servicio.id)}
                >
                  <RemoveRedEyeIcon />
                </IconButton>

                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditar(servicio.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleEliminar(servicio.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <UsuarioModal
          edit={edit}
          open={isModalOpen}
          handleClose={handleClose}
          user={user}
        />
      </Container>
    </>
  );
};
