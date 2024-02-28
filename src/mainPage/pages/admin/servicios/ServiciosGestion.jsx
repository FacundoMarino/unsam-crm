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
import {
  eliminarServicio,
  getServicios,
} from '../../../../store/servicios/thunks';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ServicioCreateModal } from './ServicioCreateModal';
import {
  setIndividualService,
  setStatus,
} from '../../../../store/servicios/servicesSlider';
export const ServicioGestion = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const servicios = useSelector((state) => state.services.services);
  const status = useSelector((state) => state.services.status);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    if (status === 'ok') {
      dispatch(getServicios({ telekinesis }));
      dispatch(setStatus(''));
    }
  }, [status]);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setId('');
    dispatch(setIndividualService([]));
  };
  const handlerNuevoServicio = () => {
    handleModalOpen();
  };

  const handleEliminar = (id) => {
    dispatch(eliminarServicio({ telekinesis, id }));
  };

  const handleEditar = (id) => {
    setId(id);
    handleModalOpen();
  };

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Servicios
            </Typography>
            <Button
              color="inherit"
              onClick={handlerNuevoServicio}
              startIcon={<AddIcon />}
            >
              Nuevo Servicio
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {servicios?.map((servicio) => (
            <ListItem key={servicio.id}>
              <ListItemText primary={servicio.service} />
              <ListItemSecondaryAction>
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

        <ServicioCreateModal
          open={isModalOpen}
          handleClose={handleClose}
          id={id}
        />
      </Container>
    </>
  );
};
