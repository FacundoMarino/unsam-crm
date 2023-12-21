// TurnosDisponibles.js

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

export const TurnosDisponibles = () => {
  const [orden, setOrden] = useState('asc');
  const [campoOrden, setCampoOrden] = useState('fecha');

  const turnosDisponibles = [
    {
      id: 1,
      nombre: 'Juan Perez',
      modalidad: 'Presencial',
      tipo: 'Consulta',
      fecha: '2022-01-01',
      dia: 'Lunes',
      horaInicio: '10:00',
      horaFinal: '11:00',
      estado: 'Sin Asignar',
      servicio: '-',
    },
    {
      id: 2,
      nombre: 'Jose Gonzalez',
      modalidad: 'Presencial',
      tipo: 'Admisión',
      fecha: '2021-01-02',
      dia: 'Martes',
      horaInicio: '10:00',
      horaFinal: '11:00',
      estado: 'Asignado',
      servicio: '-',
    },
    {
      id: 3,
      nombre: 'Roberto Rojas',
      modalidad: 'Virtual',
      tipo: 'Asistencia',
      fecha: '2023-12-21',
      dia: 'Miércoles',
      horaInicio: '08:00',
      horaFinal: '08:30',
      estado: 'Sin Asignar',
      servicio: '-',
    },
  ];

  const handleTomarTurno = (idTurno) => {
    // Despachar la acción para tomar el turno
    console.log('Tomar turno con ID:', idTurno);
  };

  const handleCancelarTurno = (idTurno) => {
    // Despachar la acción para cancelar el turno
    console.log('Cancelar turno con ID:', idTurno);
  };

  const handleDesasignarTurno = (idTurno) => {
    // Despachar la acción para desasignar el turno
    console.log('Desasignar turno con ID:', idTurno);
  };

  const handleOrdenarTabla = (campo) => {
    const nuevoOrden = campo === campoOrden && orden === 'asc' ? 'desc' : 'asc';
    setOrden(nuevoOrden);
    setCampoOrden(campo);
  };

  const turnosOrdenados = turnosDisponibles.slice().sort((a, b) => {
    const comparador = orden === 'asc' ? 1 : -1;
    return a[campoOrden].localeCompare(b[campoOrden]) * comparador;
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Button onClick={() => handleOrdenarTabla('nombre')}>
                Nombre
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button onClick={() => handleOrdenarTabla('tipo')}>
                Tipo de Turno
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button onClick={() => handleOrdenarTabla('servicio')}>
                Servicio
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button onClick={() => handleOrdenarTabla('modalidad')}>
                Modalidad
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button onClick={() => handleOrdenarTabla('fecha')}>Fecha</Button>
            </TableCell>

            <TableCell align="center">
              <Button onClick={() => handleOrdenarTabla('horaInicio')}>
                Hora
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button onClick={() => handleOrdenarTabla('estado')}>
                Estado
              </Button>
            </TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {turnosOrdenados.map((turno) => (
            <TableRow key={turno.id}>
              <TableCell align="center">{turno.nombre}</TableCell>
              <TableCell align="center">{turno.tipo}</TableCell>
              <TableCell align="center">{turno.servicio}</TableCell>
              <TableCell align="center">{turno.modalidad}</TableCell>
              <TableCell align="center">{turno.fecha}</TableCell>
              <TableCell align="center">
                {turno.horaInicio} - {turno.horaFinal}
              </TableCell>
              <TableCell align="center">{turno.estado}</TableCell>
              <TableCell align="center">
                {turno.estado !== 'Asignado' && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleTomarTurno(turno.id)}
                      style={{ marginRight: '10px' }}
                    >
                      Tomar Turno
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancelarTurno(turno.id)}
                    >
                      Cancelar Turno
                    </Button>
                  </>
                )}
                {turno.estado === 'Asignado' && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDesasignarTurno(turno.id)}
                  >
                    Desasignar Turno
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
