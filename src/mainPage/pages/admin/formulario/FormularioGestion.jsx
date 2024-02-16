import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteFormId, getAllForms } from '../../../../store/forms/thunks';
import {
  setForm,
  setFormId,
  setStatusForm,
} from '../../../../store/forms/formSlider';

export const FormularioGestion = ({
  handleNewFormClick,
  setDisplayEditForm,
  setStepEditForm,
  setDisplayViewForm,
}) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const formsStore = useSelector((state) => state.forms.form);
  const formStatus = useSelector((state) => state.forms.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllForms({ telekinesis }));
    setForm(formsStore);
    setDisplayEditForm('none');
    setDisplayViewForm('none');
    setStepEditForm('none');
  }, []);

  useEffect(() => {
    if (formStatus === 'ok') {
      dispatch(getAllForms({ telekinesis }));
    }
    setStatusForm('');
  }, [formStatus]);

  const handleEditar = (id) => {
    setDisplayEditForm('');
    dispatch(setFormId(id));
    handleNewFormClick(1);
  };

  const handleAgregarStep = (id) => {
    dispatch(setFormId(id));
    handleNewFormClick(4);
    setStepEditForm('');
  };

  const handlePreView = (id) => {
    dispatch(setFormId(id));
    handleNewFormClick(3);
    setDisplayViewForm('');
  };
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
              <Tooltip title="Editar" arrow>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditar(form.id)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Agregar Step" arrow>
                <IconButton
                  edge="end"
                  aria-label="add-step"
                  hovered="Agregar step"
                  onClick={() => handleAgregarStep(form.id)}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Pre Visualización" arrow>
                <IconButton
                  edge="end"
                  aria-label="view"
                  onClick={() => handlePreView(form.id)}
                >
                  <RemoveRedEyeIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Borrar" arrow>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleEliminar(form.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
