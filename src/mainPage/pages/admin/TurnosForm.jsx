import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { getShiftsTypes, postShiftType } from '../../../store/shift/thunks';
import { useEffect } from 'react';
import { setAdminStatus } from '../../../store/shift/shiftSlider';

const startData = {
  name: '',
  days: [],
  start_time: '',
  end_time: '',
  shift_type: '',
  virtual_appointments_duration: 0,
  virtual_quota: 0,
  in_person_appointments_duration: 0,
  in_person_quota: 0,
  in_admin_inbox: 0,
  in_admission_inbox: 0,
  in_consultancy_inbox: 0,
  inbox: [],
};

export const TurnosForm = ({ setDisplayCreateShift }) => {
  const dispatch = useDispatch();
  const { telekinesis, user_id } = useSelector((state) => state.auth);
  const adminStatus = useSelector((state) => state.shift.adminStatus);

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
    resetHandler,
  } = useForm(startData);

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
      postShiftType({
        ...formState,
        telekinesis,
        user_id,
        ...resultDays,
        ...resultInbox,
      }),
    );

    setDisplayCreateShift('none');
  };

  useEffect(() => {
    if (adminStatus === 'ok') {
      resetHandler(startData);
    }
    setAdminStatus('');
  }, [adminStatus]);

  return (
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

      <Button variant="contained" color="primary" onClick={handleSave}>
        Guardar
      </Button>
    </form>
  );
};
