import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShiftsTypes } from '../../../store/shift/thunks';
import { storeTasks } from '../../../store/tasks/thunks';
import { getAllForms } from '../../../store/forms/thunks';

export const ServiciosModal = ({ open, handleClose, selectedCompany }) => {
  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const shiftType = useSelector((state) => state.shift.shiftType);
  const forms = useSelector((state) => state.forms.form.forms);

  const [service, setService] = useState('');
  const [shift, setShift] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [taskType, setTaskType] = useState('');
  const [formIndividual, setForm] = useState('');

  useEffect(() => {
    if (service === 'turnos') {
      dispatch(getShiftsTypes({ telekinesis }));
      setTaskType(1);
    } else if (service === 'formularios') {
      dispatch(getAllForms({ telekinesis }));
      setTaskType(3);
    } else {
      setTaskType(2);
    }
  }, [service]);

  const handleSubmit = () => {
    handleClose(false);
    if (service === 'turnos') {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          enterprise_id: selectedCompany,
          shift_type: shift,
          comment: textareaValue,
        }),
      );
    } else if (service === 'formularios') {
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          enterprise_id: selectedCompany,
          comment: textareaValue,
          form_id: formIndividual,
        }),
      );
    } else {
      console.log(taskType);
      dispatch(
        storeTasks({
          telekinesis,
          tipo_tarea: taskType,
          comment: textareaValue,
          enterprise_id: selectedCompany,
        }),
      );
    }
    handleClose(false);
    setTextareaValue('');
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs" style={{ width: '500px' }}>
        <DialogTitle>Servicios</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <Select
              label="Selecciona un servicio"
              fullWidth
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <MenuItem value="documentacion">Documentación</MenuItem>
              <MenuItem value="formularios">Formularios</MenuItem>
              <MenuItem value="turnos">Turnos</MenuItem>
            </Select>
          </FormControl>

          {service === 'turnos' && (
            <>
              <FormControl fullWidth margin="normal">
                <Select
                  label="Selecciona un Turno"
                  fullWidth
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                >
                  {shiftType.map((shift) => (
                    <MenuItem key={shift.id} value={shift.id}>
                      {shift.shift_type}
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
                    style={{ backgroundColor: '#6A51e1' }}
                    onClick={() => handleClose(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#6A51e1' }}
                    onClick={() => handleSubmit()}
                    fullWidth
                  >
                    Asignar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {service === 'formularios' && (
            <>
              <FormControl fullWidth margin="normal">
                <Select
                  label="Selecciona un Turno"
                  fullWidth
                  value={formIndividual}
                  onChange={(e) => setForm(e.target.value)}
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
                    style={{ backgroundColor: '#6A51e1' }}
                    onClick={() => handleSubmit()}
                    fullWidth
                  >
                    Asignar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {service === 'documentacion' && (
            <>
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
                    style={{ backgroundColor: '#6A51e1' }}
                    onClick={() => handleClose(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#6A51e1' }}
                    onClick={() => handleSubmit()}
                    fullWidth
                  >
                    Asignar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Container>
    </Dialog>
  );
};
