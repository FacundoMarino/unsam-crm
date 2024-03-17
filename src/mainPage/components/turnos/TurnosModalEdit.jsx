import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
  Dialog,
  DialogContent,
  CssBaseline,
  DialogTitle,
} from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateShift } from '../../../store/shift/thunks';
import { useEffect, useState } from 'react';

const startData = {
  name: '',
  days: [],
  start_time: '',
  end_time: '',
  shift_type: '',
  virtual_appointments_duration: 0,
  virtual_quota: 0,
  in_person_appointments_duration: 0,
  in_personn_quota: 0,
  in_admin_inbox: 0,
  in_admission_inbox: 0,
  in_consultancy_inbox: 0,
  inbox: [],
};

export const TurnosModalEdit = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(startData);

  const { telekinesis, user_id } = useSelector((state) => state.auth);
  const currentShift = useSelector(
    (state) => state.shift.currentShift.edit_shift,
  );

  useEffect(() => {
    // Actualizar formData cuando cambia currentShift
    if (currentShift) {
      setFormData({
        ...startData,
        ...currentShift,
        days: currentShift.days ? Object.keys(currentShift.days) : [],
      });
    }
  }, [currentShift]);
  const {
    start_time,
    end_time,
    shift_type,
    virtual_appointments_duration,
    virtual_quota,
    in_person_appointments_duration,
    in_person_quota,
    inputHandler,
    formState,
    inbox,
    days,
  } = useForm(formData);

  const diasSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  const asociados = ['Admin', 'Admisión', 'Consultor'];

  const contarAsociados = (asociados, seleccionados) => {
    const contadorAsociados = {};

    const asociadosEnIngles = {
      Admin: 'in_admin_inbox',
      Admisión: 'in_admission_inbox',
      Consultor: 'in_consultancy_inbox',
    };

    asociados.forEach((asociado) => {
      const claveEnIngles = asociadosEnIngles[asociado] || asociado;

      contadorAsociados[claveEnIngles] =
        (contadorAsociados[claveEnIngles] || 0) +
        (seleccionados.includes(asociado) ? 1 : 2);
    });

    return contadorAsociados;
  };

  const contarDiasEnma = (days) => {
    const contadorDiasEnma = {};

    const diasEnIngles = {
      Lunes: 'monday',
      Martes: 'tuesday',
      Miércoles: 'wednesday',
      Jueves: 'thursday',
      Viernes: 'friday',
      Sábado: 'saturday',
      Domingo: 'sunday',
    };

    days.forEach((dia) => {
      const claveEnIngles = diasEnIngles[dia];

      if (claveEnIngles) {
        contadorDiasEnma[claveEnIngles] =
          (contadorDiasEnma[claveEnIngles] || 0) + 1;
      }
    });

    return contadorDiasEnma;
  };

  const handleSave = () => {
    let resultDays = contarDiasEnma(days);
    let resultInbox = contarAsociados(asociados, inbox);

    dispatch(
      updateShift({
        ...formState,
        telekinesis,
        user_id,
        ...resultDays,
        ...resultInbox,
      }),
    );
    handleClose();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div></div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nombre del Turno"
              name="shift_type"
              value={shift_type}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Días Activos</InputLabel>
              <Select
                multiple
                name="days"
                value={days}
                onChange={inputHandler}
                renderValue={(selected) => selected.join(', ')}
              >
                {diasSemana.map((dia) => (
                  <MenuItem key={dia} value={dia}>
                    <Checkbox checked={days.indexOf(dia) > -1} />
                    {dia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Tiempo Modalidad Virtual (minutos)"
              name="virtual_appointments_duration"
              value={virtual_appointments_duration}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Cupo modalidad Virtual"
              name="virtual_quota"
              value={virtual_quota}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Tiempo Modalidad Presencial (minutos)"
              name="in_person_appointments_duration"
              value={in_person_appointments_duration}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Cupo Modalidad Presencial"
              name="in_person_quota"
              value={in_person_quota}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Hora de Inicio"
              type="time"
              name="start_time"
              value={start_time}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Hora Final"
              type="time"
              name="end_time"
              value={end_time}
              onChange={inputHandler}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Asociado</InputLabel>
              <Select
                multiple
                name="inbox"
                value={inbox}
                onChange={inputHandler}
                renderValue={(selected) => selected.join(', ')}
              >
                {asociados.map((asociado) => (
                  <MenuItem key={asociado} value={asociado}>
                    <Checkbox checked={inbox.indexOf(asociado) > -1} />
                    {asociado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              style={{ backgroundColor: '#AC00E3' }}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
