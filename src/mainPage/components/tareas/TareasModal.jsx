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
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getShiftsTypes } from '../../../store/shift/thunks';
import {
  getEnterprises,
  getTasks,
  storeTasks,
} from '../../../store/tasks/thunks';
import { getAllForms } from '../../../store/forms/thunks';

export const TareasModal = ({ open, handleClose, iconTitle }) => {
  const [selectedTurno, setSelectedTurno] = useState();
  const [selectedEmpresa, setSelectedEmpresa] = useState();
  const [textareaValue, setTextareaValue] = useState('');
  const [taskType, setTaskType] = useState('');
  const [selectedForm, setSelectedForm] = useState('');

  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const shifts = useSelector((state) => state.shift.shiftType);
  const enterprises = useSelector((state) => state.tasks.enterprises);
  const forms = useSelector((state) => state.forms.form.forms);

  useEffect(() => {
    if (iconTitle === 'Solicitar Turno') {
      dispatch(getShiftsTypes({ telekinesis }));
      dispatch(getEnterprises({ telekinesis }));
      setTaskType(1);
    }
  }, [iconTitle]);

  useEffect(() => {
    if (iconTitle === 'Enviar Formulario') {
      dispatch(getAllForms({ telekinesis }));
      dispatch(getEnterprises({ telekinesis }));
      setTaskType(3);
    }
  }, [iconTitle]);

  useEffect(() => {
    if (iconTitle === 'Enviar Tarea') {
      setTaskType(2);
    }
  }, [iconTitle]);

  useEffect(() => {
    if (iconTitle === 'Ver Servicios') {
      dispatch(getEnterprises({ telekinesis }));
    }
  }, [iconTitle]);
  const handleSubmit = (iconTitle) => {
    handleClose(false);
    if (iconTitle === 'Solicitar Turno') {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          enterprise_id: selectedEmpresa,
          shift_type: selectedTurno,
          comment: textareaValue,
        }),
      );
    } else if (iconTitle === 'Enviar Formulario') {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          enterprise_id: selectedForm,
          comment: textareaValue,
          form_id: selectedForm,
        }),
      );
    } else {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          comment: textareaValue,
          enterprise_id: selectedForm,
        }),
      );
    }
  };

  const handleSearchTasks = () => {
    dispatch(getTasks({ telekinesis, enterprise_id: selectedEmpresa }));
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
              <FormControl fullWidth margin="normal">
                <InputLabel id="empresa-select-label">Empresa</InputLabel>
                <Select
                  labelId="empresa-select-label"
                  id="empresa-select"
                  value={selectedEmpresa}
                  onChange={(e) => setSelectedEmpresa(e.target.value)}
                >
                  {enterprises?.map((empresa) => (
                    <MenuItem key={empresa.id} value={empresa.id}>
                      {empresa.razon_social}
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
                    color="primary"
                    onClick={() => handleClose(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(iconTitle)}
                    fullWidth
                  >
                    Asignar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {iconTitle === 'Enviar Tarea' && (
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
                      color="primary"
                      onClick={() => handleClose(false)}
                      fullWidth
                    >
                      Cancelar
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
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
                    <MenuItem key={form.id} value={form.name}>
                      {form.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="empresa-select-label">Empresa</InputLabel>
                <Select
                  labelId="empresa-select-label"
                  id="empresa-select"
                  value={selectedEmpresa}
                  onChange={(e) => setSelectedEmpresa(e.target.value)}
                >
                  {enterprises?.map((empresa) => (
                    <MenuItem key={empresa} value={empresa.id}>
                      {empresa.razon_social}
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
                    color="primary"
                    onClick={() => handleClose(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleSubmit(iconTitle)}
                  >
                    Asignar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {iconTitle === 'Ver Servicios' && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="empresa-select-label">Empresa</InputLabel>
              <Select
                labelId="empresa-select-label"
                id="empresa-select"
                value={selectedEmpresa}
                onChange={(e) => setSelectedEmpresa(e.target.value)}
              >
                {enterprises?.map((empresa) => (
                  <MenuItem key={empresa.id} value={empresa.id}>
                    {empresa.razon_social}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearchTasks}
                style={{ marginTop: '20px' }}
              >
                Buscar Servicio
              </Button>
            </FormControl>
          )}
        </DialogContent>
      </Container>
    </Dialog>
  );
};
