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
import { updateTask } from '../../store/tasks/thunks';

export const TurnosPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [hoursNotAvailable, setHoursNotAvailable] = useState([]);
  const [locations, setLocations] = useState([]);

  const user = useSelector((state) => state.auth);
  const step = useSelector((state) => state.shift.status);
  const diasNoDisponibles = useSelector(
    (state) => state.shift.daysNotAvailable,
  );
  const shify_id = useSelector((state) => state.shift.shift_type_id);
  const shiftType = useSelector((state) => state.shift.shiftType);
  const optionsHoras = useSelector((state) => state.shift.hoursNotAvailable);
  const location = useSelector((state) => state.shift.location);
  const taskId = useSelector((state) => state.tasks.taskId);
  const enterprise_id = useSelector((state) => state.auth.enterprise_id);

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
    if (location && shiftType) {
      let getNotAvailableHours = getAvailableHours();

      setHoursNotAvailable(getNotAvailableHours);
    }
  }, [location, optionsHoras, shiftType]);

  useEffect(() => {
    if (selectedOption) {
      let location = shiftType.find(
        (item) => item.shift_type === selectedOption,
      );

      let locations = [];

      if (location.in_person_quota !== 0) {
        locations.push('presencial');
      }
      if (location.virtual_quota !== 0) {
        locations.push('virtual');
      }

      setLocations(locations);
    }
  }, [shiftType, selectedOption]);

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
    const individutalShift = shiftType.find(
      (item) => item.shift_type === selectedOption,
    );
    const formatHour = (hour, minutes, seconds = 0) => {
      return `${hour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Obtener el tiempo de inicio y duración de los turnos según el tipo
    const startTime = individutalShift.start_time;
    const endTime = individutalShift.end_time;
    const duration =
      selectedLocation === 'presencial'
        ? individutalShift.in_person_appointments_duration
        : individutalShift.virtual_appointments_duration;

    // Convertir startTime a un objeto Date para cálculos
    const [startHour, startMinute, startSecond] = startTime
      .split(':')
      .map(Number);
    const [startHourEnd, startMinuteEnd, startSecondEnd] = endTime
      .split(':')
      .map(Number);
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(startHour, startMinute, startSecond);
    endDate.setHours(startHourEnd, startMinuteEnd, startSecondEnd);

    // Calcular endDate basado en el tiempo de inicio y duración del turno
    const availableHours = [];

    // Obtener las horas no disponibles
    const unavailableHours = optionsHoras.map((item) => item.hour);

    // Generar los intervalos de tiempo disponibles
    while (startDate <= endDate) {
      const currentHour = formatHour(
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds(),
      );

      // Verificar si la hora actual está disponible
      if (!unavailableHours.includes(currentHour)) {
        availableHours.push(currentHour);
      }

      // Incrementar el tiempo por la duración del turno
      startDate.setMinutes(startDate.getMinutes() + duration);
    }

    return availableHours;
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
          tarea_id: taskId,
        }),
      );

      dispatch(
        updateTask({
          telekinesis: user.telekinesis,
          enterprise_id,
          status: 2,
          id: taskId,
        }),
      );

      resetFields();
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
