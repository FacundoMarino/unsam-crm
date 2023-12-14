import React from 'react';
import {
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from '@mui/material';

export const TurnosStepOne = ({
  options,
  locations,
  selectedOption,
  selectedLocation,
  setSelectedOption,
  setSelectedLocation,
  resetFields,
  saveAndSendData,
}) => {
  return (
    <Grid container spacing={2}>
      {/* Opción */}
      <Grid item xs={6} md={6}>
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
      <Grid item xs={6} md={6}>
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