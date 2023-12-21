import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { TurnosStepTwo } from '../components/turnos/TurnosStepTwo';
import { TurnosStepOne } from '../components/turnos/TurnosStepOne';

export const TurnosPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const [step, setStep] = useState(true);

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
    setStep(!step);
  };
  return step === true ? (
    <Grid container spacing={2} mt={5}>
      <TurnosStepOne
        options={options}
        locations={locations}
        selectedOption={selectedOption}
        selectedLocation={selectedLocation}
        setSelectedOption={setSelectedOption}
        setSelectedLocation={setSelectedLocation}
        resetFields={resetFields}
        saveAndSendData={saveAndSendData}
        setStep={setStep}
        selectedDate={selectedDate}
      />
    </Grid>
  ) : (
    <Grid container spacing={2} mt={5}>
      <TurnosStepTwo
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isDayDisabled={isDayDisabled}
        optionsHoras={optionsHoras}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        resetFields={resetFields}
        saveAndSendData={saveAndSendData}
        setStep={setStep}
      />
    </Grid>
  );
};
