import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Button } from '@mui/material';
import { OptionSection } from '../components/turnos/optionSection';
import { LocationSection } from '../components/turnos/locationSection';
import { DateSection } from '../components/turnos/dateSection';
import { TimeSection } from '../components/turnos/timeSection';

export const TurnosPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const tipoDeTurno = [
    { value: 'opcion1', label: 'Admisión' },
    { value: 'opcion2', label: 'Asesoria' },
    { value: 'opcion3', label: 'Consultoria' },
    { value: 'opcion4', label: 'Capacitación' },
    { value: 'opcion5', label: 'Asesoria' },
    { value: 'opcion6', label: 'Visita' },

    { value: 'opcion7', label: 'Financiamiento' },
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
      <OptionSection
        options={tipoDeTurno}
        setSelectedOption={setSelectedOption}
        resetFields={resetFields}
      />
      <LocationSection
        locations={locations}
        setSelectedLocation={setSelectedLocation}
      />
      <DateSection
        selectedOption={selectedOption}
        setSelectedDate={setSelectedDate}
        isDayDisabled={isDayDisabled}
      />
      <TimeSection
        selectedDate={selectedDate}
        selectedLocation={selectedLocation}
        setSelectedTime={setSelectedTime}
        optionsHoras={optionsHoras}
      />

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
