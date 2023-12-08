import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';

export const TurnosPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const options = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    // Agrega más opciones según sea necesario
  ];

  const locations = ['Presencial', 'Virtual'];

  const diasNoDisponibles =
    {
      opcion1: [new Date(2023, 11, 10), new Date(2023, 11, 15)],
      opcion2: [new Date(2023, 11, 5), new Date(2023, 11, 20)],
      // Ajusta los días no disponibles para cada opción
    }[selectedOption] || [];

  const isDayDisabled = (date) => {
    return diasNoDisponibles.some(
      (d) =>
        date.getFullYear() === d.getFullYear() &&
        date.getMonth() === d.getMonth() &&
        date.getDate() === d.getDate(),
    );
  };

  const optionsHoras = ['09:00 AM', '12:00 PM', '03:00 PM'];

  const resetFields = () => {
    setSelectedOption('');
    setSelectedDate(null);
    setSelectedTime('');
    setSelectedLocation('');
  };

  const saveAndSendData = () => {
    // Lógica para guardar y enviar datos a la API
    console.log('Datos guardados y enviados:', {
      selectedOption,
      selectedDate,
      selectedTime,
      selectedLocation,
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Opción */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <h2>Selecciona una opción</h2>
          <FormControl fullWidth>
            <InputLabel
              id="opcion-select-label"
              style={{ marginBottom: '8px' }}
            >
              Opción
            </InputLabel>
            <Select
              labelId="opcion-select-label"
              id="opcion-select"
              value={selectedOption}
              onChange={(event) => {
                setSelectedOption(event.target.value);
                setSelectedDate(null);
                setSelectedTime('');
                setSelectedLocation('');
              }}
            >
              {options.map((opcion) => (
                <MenuItem key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Tipo de cita (Presencial o Virtual) */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <h2>Selecciona el tipo de cita</h2>
          <FormControl fullWidth>
            <InputLabel id="location-select-label">Tipo de Cita</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Calendario */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '36px' }}>
          <h2>Selecciona la fecha</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            filterDate={isDayDisabled}
            locale={es}
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
          />
        </Paper>
      </Grid>

      {/* Horarios */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <h2>Selecciona la hora</h2>
          <FormControl fullWidth>
            <InputLabel id="hora-select-label">Selecciona la hora</InputLabel>
            <Select
              labelId="hora-select-label"
              id="hora-select"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              disabled={!selectedDate || !selectedLocation}
            >
              {optionsHoras.map((hora) => (
                <MenuItem key={hora} value={hora}>
                  {hora}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>
      {/* Botones */}
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="outlined" color="secondary" onClick={resetFields}>
          Reiniciar
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
          onClick={saveAndSendData}
        >
          Guardar y Enviar
        </Button>
      </Grid>
    </Grid>
  );
};
