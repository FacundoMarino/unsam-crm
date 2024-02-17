import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  Modal,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
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
  const data = [
    {
      id: 1,
      nombre: 'Juan',
      start: new Date('2023-12-01T10:00:00'),
      end: new Date('2023-12-01T11:00:00'),
      tipoCita: 'Presencial',
      opcion: 'Opcion 1',
      direccion: 'Calle 5',
    },
    {
      id: 2,
      nombre: 'Pedro',
      start: new Date('2023-12-01T10:00:00'),
      end: new Date('2023-12-01T11:00:00'),
      tipoCita: 'Virtual',
      opcion: 'Opcion 1',
      link: 'https://www.google.com',
    },
    {
      id: 3,
      nombre: 'Pedro',
      start: new Date('2023-12-01T10:00:00'),
      end: new Date('2023-12-01T11:00:00'),
      tipoCita: 'Virtual',
      opcion: 'Opcion 1',
      link: 'https://www.google.com',
    },
    {
      id: 4,
      nombre: 'Pedro',
      start: new Date('2023-12-01T10:00:00'),
      end: new Date('2023-12-01T11:00:00'),
      tipoCita: 'Virtual',
      opcion: 'Opcion 1',
      link: 'https://www.google.com',
    },
    {
      id: 5,
      nombre: 'Pedro',
      start: new Date('2023-12-01T10:00:00'),
      end: new Date('2023-12-01T11:00:00'),
      tipoCita: 'Virtual',
      opcion: 'Opcion 1',
      link: 'https://www.google.com',
    },
    {
      id: 6,
      nombre: 'Pedro',
      start: new Date('2023-12-01T10:00:00'),
      end: new Date('2023-12-01T11:00:00'),
      tipoCita: 'Virtual',
      opcion: 'Opcion 1',
      link: 'https://www.google.com',
    },
    {
      id: 7,
      nombre: 'Marcelo',
      start: new Date('2023-12-02T10:00:00'),
      end: new Date('2023-12-02T11:00:00'),
      tipoCita: 'Presencial',
      opcion: 'Opcion 1',
      direccion: 'Calle 2',
    },
    {
      id: 8,
      nombre: 'Carlos',
      start: new Date('2023-12-04T15:00:00'),
      end: new Date('2023-12-04T16:00:00'),
      tipoCita: 'Presencial',
      opcion: 'Opcion 1',
      direccion: 'Calle 3',
    },
    {
      id: 9,
      nombre: 'Luis',
      start: new Date('2023-12-12T10:00:00'),
      end: new Date('2023-12-12T11:00:00'),
      tipoCita: 'Presencial',
      opcion: 'Opcion 1',
      direccion: 'Calle 1',
    },
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setOpenModal(false);
  };

  const handleVerDetalle = (turno) => {
    setSelectedTurno(turno);
    onVerDetalle(turno); // Llamar a la función proporcionada por props
    setOpenModal(false); // Cerrar el modal si es necesario
  };

  const turnosParaFecha = data.filter((turno) =>
    moment(turno.start).isSame(selectedDate, 'day'),
  );

  useEffect(() => {
    setDisplayCreateShift('none');
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        culture="es"
        messages={customMessages}
      />

      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          className="animate__animated animate__fadeIn animate__faster"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
          }}
        >
          <Paper
            style={{
              padding: '10px',
              backgroundColor: 'white',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h5" component="div">
              Turnos para el{' '}
              {selectedDate ? moment(selectedDate).format('LL') : ''}
            </Typography>
            {turnosParaFecha.map((turno, index) => (
              <Card key={index} style={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography>{`Nombre: ${turno.nombre}`}</Typography>
                  <Typography>{`Hora: ${moment(turno.start).format(
                    'LT',
                  )}`}</Typography>
                  <Typography>{`Tipo de Cita: ${turno.tipoCita}`}</Typography>
                  {turno.tipoCita === 'Presencial' && (
                    <Typography>{`Dirección: ${
                      turno.direccion || 'No especificada'
                    }`}</Typography>
                  )}
                  {turno.tipoCita === 'Virtual' && (
                    <Typography>{`Link de la reunión: ${
                      turno.link || 'No especificado'
                    }`}</Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerDetalle(turno)}
                    style={{ marginTop: '10px' }}
                  >
                    Ver Detalle
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
              style={{ marginTop: '20px ' }}
            >
              Cerrar
            </Button>
          </Paper>
        </div>
      </Modal>
    </div>
  );
};
