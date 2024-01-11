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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteFormId, getAllForms } from '../../../../store/forms/thunks';
import {
  setForm,
  setFormId,
  setStatusForm,
} from '../../../../store/forms/formSlider';

export const FormularioGestion = ({ handleNewFormClick }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const formsStore = useSelector((state) => state.forms.form);
  const formStatus = useSelector((state) => state.forms.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllForms({ telekinesis }));
    setForm(formsStore);
  }, []);

  useEffect(() => {
    if (formStatus === 'ok') {
      dispatch(getAllForms({ telekinesis }));
    }
    setStatusForm('');
  }, [formStatus]);

  const handleEditar = (id) => {
    dispatch(setFormId(id));
    handleNewFormClick();
  };

  const handleCloseModal = () => {};

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFormId({ telekinesis, id }));
      }
    });
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Formularios
          </Typography>
        </Toolbar>
      </AppBar>

      <List>
        {formsStore.forms?.map((form) => (
          <ListItem key={form.id}>
            <ListItemText primary={form.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditar(form.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleEliminar(form.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
