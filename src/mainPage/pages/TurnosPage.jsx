import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { TurnosStepTwo } from '../components/turnos/TurnosStepTwo';
import { TurnosStepOne } from '../components/turnos/TurnosStepOne';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDaysNotAvailable,
  getShiftsTypes,
  postShiftStepTwo,
  postStoreShift,
} from '../../store/shift/thunks';
import { resetShift } from '../../store/shift/shiftSlider';

export const TurnosPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [hoursNotAvailable, setHoursNotAvailable] = useState([]);

  const user = useSelector((state) => state.auth);
  const step = useSelector((state) => state.shift.status);
  const diasNoDisponibles = useSelector(
    (state) => state.shift.daysNotAvailable,
  );
  const shify_id = useSelector((state) => state.shift.shift_type_id);
  const optionsHoras = useSelector((state) => state.shift.hoursNotAvailable);
  const location = useSelector((state) => state.shift.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShiftsTypes({ telekinesis: user.telekinesis }));
  }, [dispatch, user.telekinesis]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];

      dispatch(
        postShiftStepTwo({
          location: selectedLocation,
          shift_type: selectedOption,
          telekinesis: user.telekinesis,
          day: formattedDate,
        }),
      );
    }
  }, [
    dispatch,
    selectedDate,
    selectedLocation,
    selectedOption,
    user.telekinesis,
  ]);

  useEffect(() => {
    if (location) {
      let getNotAvailableHours = getAvailableHours();

      setHoursNotAvailable(getNotAvailableHours);
    }
  }, [location, optionsHoras]);

  const locations = ['presencial', 'virtual'];

  const isDayDisabled = (date) => {
    if (typeof diasNoDisponibles === 'object' && diasNoDisponibles !== null) {
      const dayOfWeek = date.getDay();
      const dayOfWeekString = getDayOfWeekString(dayOfWeek);

      return diasNoDisponibles[dayOfWeekString];
    }
    return false;
  };

  // Función auxiliar para obtener el nombre del día de la semana
  const getDayOfWeekString = (dayOfWeek) => {
    const daysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return daysOfWeek[dayOfWeek];
  };

  const getAvailableHours = () => {
    const formatHour = (hour, minutes) => {
      return `${hour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:00`;
    };

    const unavailableHours = optionsHoras.map((item) => item.hour);
    if (diasNoDisponibles.length !== 0) {
      if (location === 'presencial') {
        const presentianHours = Array.from({ length: 8 }, (_, index) =>
          formatHour(index + 9, 0),
        );
        return presentianHours.filter(
          (hour) => !unavailableHours.includes(hour),
        );
      } else if (location === 'virtual') {
        // Si es virtual y no hay días no disponibles, mostrar turnos de 30 minutos de 8:30 am a 4 pm
        const virtualHours = Array.from({ length: 15 }, (_, index) =>
          formatHour(Math.floor(index / 2) + 8, (index % 2) * 30),
        );
        return virtualHours.filter((hour) => !unavailableHours.includes(hour));
      }
    }

    // Filtrar las horas no disponibles
    const filteredHours = Array.from({ length: 17 }, (_, index) =>
      formatHour(Math.floor(index / 2) + 8, (index % 2) * 30),
    );

    if (Array.isArray(diasNoDisponibles)) {
      return filteredHours.filter((hour) => !unavailableHours.includes(hour));
    }

    // Si diasNoDisponibles no es un array, devolver todas las horas filtradas solo por unavailableHours
    return filteredHours.filter((hour) => !unavailableHours.includes(hour));
  };

  const resetFields = () => {
    setSelectedOption('');
    setSelectedDate(null);
    setSelectedTime('');
    setSelectedLocation('');
  };

  const cancelButton = () => {
    resetFields();
    dispatch(resetShift());
  };
  const saveAndSendData = () => {
    if (step === 'stepOne') {
      dispatch(
        getDaysNotAvailable({
          shift_type: selectedOption,
          location: selectedLocation,
          telekinesis: user.telekinesis,
        }),
      );
    } else if (step === 'stepTwo') {
      const formattedDate = selectedDate.toISOString().split('T')[0];

      dispatch(
        postStoreShift({
          shift_type: selectedOption,
          day: formattedDate,
          location: selectedLocation,
          telekinesis: user.telekinesis,
          hour: selectedTime,
          shift_type_id: shify_id,
        }),
      );
    }
  };

  return step === 'stepOne' ? (
    <Grid container spacing={2} mt={5}>
      <TurnosStepOne
        locations={locations}
        selectedOption={selectedOption}
        selectedLocation={selectedLocation}
        setSelectedOption={setSelectedOption}
        setSelectedLocation={setSelectedLocation}
        resetFields={resetFields}
        saveAndSendData={saveAndSendData}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Grid>
  ) : (
    <Grid container spacing={2} mt={5}>
      <TurnosStepTwo
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isDayDisabled={isDayDisabled}
        optionsHoras={hoursNotAvailable}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        resetFields={cancelButton}
        saveAndSendData={saveAndSendData}
      />
    </Grid>
  );
};
