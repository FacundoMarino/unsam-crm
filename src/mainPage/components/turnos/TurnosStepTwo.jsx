import React from 'react';
import {
  Paper,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  Grid,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

export const TurnosStepTwo = ({
  selectedDate,
  setSelectedDate,
  isDayDisabled,
  optionsHoras,
  selectedTime,
  setSelectedTime,
  resetFields,
  saveAndSendData,
}) => {
  return (
    <Grid container spacing={2}>
      {/* Calendario en la primera columna */}
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

      {/* Horarios en la segunda columna */}
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
              disabled={!selectedDate}
            >
              {Array.isArray(optionsHoras) &&
                optionsHoras.length > 0 &&
                optionsHoras.map((hora) => (
                  <MenuItem key={hora} value={hora}>
                    {hora}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Botones */}
      <Grid
        item
        xs={12}
        container
        justifyContent="flex-end"
        style={{ marginTop: '10px' }}
      >
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
