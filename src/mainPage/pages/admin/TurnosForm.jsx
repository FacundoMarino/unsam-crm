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

const startData = {
  name: '',
  days: [],
  start_time: '',
  end_time: '',
  shift_type: '',
  virtual_appointments_duration: 0,
  virtual_quota: 0,
  in_personn_appointments_duration: 0,
  in_personn_quota: 0,
  inbox: [],
};

export const TurnosForm = () => {
  const {
    name,
    days,
    start_time,
    end_time,
    shift_type,
    virtual_appointments_duration,
    virtual_quota,
    in_personn_appointments_duration,
    in_personn_quota,
    inputHandler,
    formState,
    inbox,
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

  const asociados = ['Admisión', 'Consultor'];

  const handleSave = () => {
    console.log(formState);
  };

  return (
    <form>
      <TextField
        label="Nombre del Turno"
        name="name"
        value={name}
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
        label="Tiempo Modalidad Virtual"
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
        label="Tiempo Modalidad Presencial"
        name="in_personn_appointments_duration"
        value={in_personn_appointments_duration}
        onChange={inputHandler}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Cupo Modalidad Presencial"
        name="in_personn_quota"
        value={in_personn_quota}
        onChange={inputHandler}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Hora de Inicio"
        type="time"
        name="hourStart"
        value={start_time}
        onChange={inputHandler}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Hora Final"
        type="time"
        name="hourEnd"
        value={end_time}
        onChange={inputHandler}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Turno</InputLabel>
        <Select value={shift_type} name={'shift_type'} onChange={inputHandler}>
          <MenuItem value="presencial">Presencial</MenuItem>
          <MenuItem value="virtual">Virtual</MenuItem>
          <MenuItem value="ambos">Ambos</MenuItem>
        </Select>
      </FormControl>

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
