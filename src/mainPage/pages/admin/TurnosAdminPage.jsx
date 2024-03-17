import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useDispatch, useSelector } from 'react-redux';
import { verTodosLosTurnosTomados } from '../../../store/shift/thunks';
moment.locale('es');

const localizer = momentLocalizer(moment);

const customMessages = {
  today: 'Hoy',
  previous: 'Atrás',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Todo el día',
  next: 'Siguiente',
  showMore: (total) => `+${total} más`,
};

export const TurnosAdminPage = ({ onVerDetalle, setDisplayCreateShift }) => {
  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const turnosDisponibles = useSelector((state) => state.shift.shiftsTakes);

  useEffect(() => {
    dispatch(verTodosLosTurnosTomados({ telekinesis }));
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setOpenModal(true);
  };

  useEffect(() => {
    setDisplayCreateShift('none');
  }, []);

  const events = turnosDisponibles.map((turno) => ({
    start: new Date(turno.day + 'T' + turno.hour),
    end: new Date(turno.day + 'T' + turno.hour),
    title: `${turno.user_name} ${turno.user_last_name}`,
    turnoInfo: turno, // Guarda toda la información del turno para acceder a ella más tarde si es necesario
  }));

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = '#AC00E3';
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
      padding: '2px',
      cursor: 'pointer',
    };
    return {
      style: style,
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        culture="es"
        messages={customMessages}
        eventPropGetter={eventStyleGetter} // Usa eventPropGetter para aplicar estilos personalizados a los eventos
      />
    </div>
  );
};
