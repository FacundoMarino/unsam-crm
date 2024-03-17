import React, { useEffect, useState } from 'react';
import {
  Container,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllForms, deleteFormId } from '../../../../store/forms/thunks';
import {
  setForm,
  setFormId,
  setStatusForm,
} from '../../../../store/forms/formSlider';
import AddIcon from '@mui/icons-material/Add';

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
    dispatch(setStatusForm(''));
  }, [formStatus, dispatch, telekinesis]);

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

  const handleNuevoFormulario = () => {
    handleNewFormClick(2);
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
      <Grid container justifyContent={'flex-end'} alignItems={'center'}>
        <Button
          style={{ backgroundColor: '#AC00E3', color: 'white', margin: 5 }}
          onClick={handleNuevoFormulario}
          startIcon={<AddIcon />}
        >
          Nuevo Formulario
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  textAlign: 'center',
                  borderBottom: '2.5px solid #AC00E3',
                  fontWeight: 'bold',
                  width: '50%',
                }}
              >
                NOMBRE DEL FORMULARIO
              </TableCell>
              <TableCell
                style={{
                  textAlign: 'center',
                  borderBottom: '2.5px solid #AC00E3',
                  fontWeight: 'bold',
                  width: '50%',
                }}
              >
                ACCIONES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formsStore?.forms?.map((form) => (
              <TableRow key={form.id}>
                <TableCell
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {form.name}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditar(form.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="add-step"
                    hovered="Agregar step"
                    onClick={() => handleAgregarStep(form.id)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="view"
                    onClick={() => handlePreView(form.id)}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleEliminar(form.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
