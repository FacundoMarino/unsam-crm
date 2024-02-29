import {
  AppBar,
  Button,
  Container,
  Grid,
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
import { eliminarServicio } from '../../../../store/servicios/thunks';
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
  setUsers,
} from '../../../../store/users/usersSlider';
import { setStatus } from '../../../../store/servicios/servicesSlider';
export const UsuariosGestion = ({ setDisplayView, handleNewFormClick }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const user = useSelector((state) => state.users.individualUser);

  const status = useSelector((state) => state.users.status);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verUsuarios({ telekinesis }));
    dispatch(setStatusUser(''));
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState('');

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

    handleModalOpen();
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
            <ListItem key={servicio.id}>
              <ListItemText primary={servicio.name} />
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
          open={isModalOpen}
          handleClose={handleClose}
          user={user}
        />
      </Container>
    </>
  );
};
