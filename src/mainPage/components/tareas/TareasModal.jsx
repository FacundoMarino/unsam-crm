import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getShiftsTypes } from '../../../store/shift/thunks';
import {
  getEnterprises,
  storeTasks,
  updateTask,
} from '../../../store/tasks/thunks';
import { getAllForms } from '../../../store/forms/thunks';
import { cambiarEstadoServicio } from '../../../store/servicios/thunks';

export const TareasModal = ({ open, handleClose, iconTitle, props }) => {
  const [selectedTurno, setSelectedTurno] = useState();
  const [selectedEmpresa, setSelectedEmpresa] = useState();
  const [textareaValue, setTextareaValue] = useState('');
  const [taskType, setTaskType] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState();
  const [estados, setEstados] = useState([]);

  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const shifts = useSelector((state) => state.shift.shiftType);
  const enterprises = useSelector((state) => state.tasks.enterprises);
  const forms = useSelector((state) => state.forms.form.forms);
  const enterpriseId = useSelector((state) => state.tasks.entepriseId);

  useEffect(() => {
    if (iconTitle === 'Solicitar Turno') {
      dispatch(getShiftsTypes({ telekinesis }));
      dispatch(getEnterprises({ telekinesis }));
      setTaskType(1);
    }
  }, [dispatch, iconTitle, telekinesis]);

  useEffect(() => {
    if (iconTitle === 'Enviar Formulario') {
      dispatch(getAllForms({ telekinesis }));
      dispatch(getEnterprises({ telekinesis }));
      setTaskType(3);
    }
  }, [dispatch, iconTitle, telekinesis]);

  useEffect(() => {
    if (iconTitle === 'Subir Documentación') {
      setTaskType(2);
    }
  }, [iconTitle]);

  useEffect(() => {
    if (iconTitle === 'Editar Estado') {
      dispatch(getEnterprises({ telekinesis }));
      if (props[0].service === 'Consulta General') {
        setEstados([
          { value: 2, label: 'Implementada' },
          { value: 3, label: 'Cancelada' },
        ]);
      } else if (props[0].service !== 'Consulta General') {
        setEstados([
          { value: 1, label: 'En Proceso' },
          { value: 2, label: 'Implementada' },
          { value: 3, label: 'Cancelada' },
        ]);
      }
    }
  }, [dispatch, iconTitle, telekinesis, props]);

  useEffect(() => {
    if (enterpriseId) {
      setSelectedEmpresa(enterpriseId);
    }
  }, [enterpriseId]);

  const handleSubmit = (iconTitle) => {
    handleClose(false);
    if (iconTitle === 'Solicitar Turno') {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          enterprise_id: selectedEmpresa,
          shift_type: selectedTurno,
          service_id: props[0].id,
          comment: textareaValue,
        }),
      );
    } else if (iconTitle === 'Enviar Formulario') {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          enterprise_id: selectedEmpresa,
          comment: textareaValue,
          form_id: selectedForm,
          service_id: props[0].id,
        }),
      );
    } else if (iconTitle === 'Subir Documentación') {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          enterprise_id: selectedEmpresa,
          comment: textareaValue,
          service_id: props[0].id,
        }),
      );
    } else {
      dispatch(
        cambiarEstadoServicio({
          telekinesis,
          tipo_tarea: taskType,
          comment: textareaValue,
          enterprise_id: selectedEmpresa,
          service_id: props[0].id,
        }),
      );
    }
    handleClose(false);
    setTextareaValue('');
    setSelectedEmpresa('');
  };

  const handleSearchTasks = () => {
    dispatch(
      cambiarEstadoServicio({
        telekinesis,
        enterprise_id: selectedEmpresa,
        status: selectedEstado,
        id: props[0].id,
      }),
    );
    handleClose(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs" style={{ width: '500px' }}>
        <DialogTitle>{iconTitle}</DialogTitle>
        <DialogContent>
          {iconTitle === 'Solicitar Turno' && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel id="turno-select-label">Turno</InputLabel>
                <Select
                  labelId="turno-select-label"
                  id="turno-select"
                  value={selectedTurno}
                  onChange={(e) => setSelectedTurno(e.target.value)}
                >
                  {shifts?.map((turno) => (
                    <MenuItem key={turno} value={turno.shift_type}>
                      {turno.shift_type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Comentarios"
                multiline
                rows={4}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                fullWidth
                margin="normal"
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#AC00E3' }}
                    onClick={() => handleClose(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#AC00E3' }}
                    onClick={() => handleSubmit(iconTitle)}
                    fullWidth
                  >
                    Asignar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {iconTitle === 'Subir Documentación' && (
            <>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Comentarios"
                  multiline
                  rows={4}
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#AC00E3' }}
                      onClick={() => handleClose(false)}
                      fullWidth
                    >
                      Cancelar
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#AC00E3' }}
                      onClick={() => handleSubmit(iconTitle)}
                      fullWidth
                    >
                      Asignar
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </>
          )}

          {iconTitle === 'Enviar Formulario' && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel id="turno-select-label">Formulario</InputLabel>
                <Select
                  labelId="turno-select-label"
                  id="turno-select"
                  value={selectedForm}
                  onChange={(e) => setSelectedForm(e.target.value)}
                >
                  {forms?.map((form) => (
                    <MenuItem key={form.id} value={form.id}>
                      {form.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Comentarios"
                multiline
                rows={4}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                fullWidth
                margin="normal"
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#AC00E3' }}
                    onClick={() => handleClose(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#AC00E3' }}
                    fullWidth
                    onClick={() => handleSubmit(iconTitle)}
                  >
                    Asignar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {iconTitle === 'Editar Estado' && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel id="estado-select-label">Estado</InputLabel>
                <Select
                  labelId="estado-select-label"
                  id="estado-select"
                  value={selectedEstado}
                  onChange={(e) => setSelectedEstado(e.target.value)}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado.value} value={estado.value}>
                      {estado.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                fullWidth
                onClick={handleSearchTasks}
                style={{ marginTop: '20px', backgroundColor: '#AC00E3' }}
              >
                Actualizar Servicio
              </Button>
            </>
          )}
        </DialogContent>
      </Container>
    </Dialog>
  );
};
