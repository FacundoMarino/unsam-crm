// TurnosDisponibles.js

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)({
  padding: '10px',
  fontSize: '12px',
});

const StyledButton = styled(Button)({
  fontSize: '12px',
});
export const TurnosDisponibles = ({ setDisplayCreateShift }) => {
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

  useEffect(() => {
    setDisplayCreateShift('none');
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <StyledButton onClick={() => handleOrdenarTabla('nombre')}>
                Nombre
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell align="center">
              <StyledButton onClick={() => handleOrdenarTabla('tipo')}>
                Tipo de Turno
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell align="center">
              <StyledButton onClick={() => handleOrdenarTabla('servicio')}>
                Servicio
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell align="center">
              <StyledButton onClick={() => handleOrdenarTabla('modalidad')}>
                Modalidad
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell align="center">
              <StyledButton onClick={() => handleOrdenarTabla('fecha')}>
                Fecha
              </StyledButton>
            </StyledTableCell>

            <StyledTableCell align="center">
              <StyledButton onClick={() => handleOrdenarTabla('horaInicio')}>
                Hora
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell align="center">
              <StyledButton onClick={() => handleOrdenarTabla('estado')}>
                Estado
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {turnosOrdenados.map((turno) => (
            <TableRow key={turno.id}>
              <StyledTableCell align="center">{turno.nombre}</StyledTableCell>
              <StyledTableCell align="center">{turno.tipo}</StyledTableCell>
              <StyledTableCell align="center">{turno.servicio}</StyledTableCell>
              <StyledTableCell align="center">
                {turno.modalidad}
              </StyledTableCell>
              <StyledTableCell align="center">{turno.fecha}</StyledTableCell>
              <StyledTableCell align="center">
                {turno.horaInicio} - {turno.horaFinal}
              </StyledTableCell>
              <StyledTableCell align="center">{turno.estado}</StyledTableCell>
              <StyledTableCell align="center">
                {turno.estado !== 'Asignado' && (
                  <>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => handleTomarTurno(turno.id)}
                      style={{ margin: '5px' }}
                    >
                      Tomar Turno
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancelarTurno(turno.id)}
                    >
                      Cancelar Turno
                    </StyledButton>
                  </>
                )}
                {turno.estado === 'Asignado' && (
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDesasignarTurno(turno.id)}
                  >
                    Desasignar Turno
                  </StyledButton>
                )}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
