import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export const TareasGestion = () => {
  // Datos de ejemplo para la tabla
  const rows = [
    {
      id: 1,
      servicio: 'Servicio 1',
      empresas: 'Empresa 1',
      contacto: 'Contacto 1',
      fechaHora: '01/01/2024 10:00 AM',
      estado: 'En progreso',
    },
    {
      id: 2,
      servicio: 'Servicio 2',
      empresas: 'Empresa 2',
      contacto: 'Contacto 2',
      fechaHora: '01/01/2024 11:30 AM',
      estado: 'Completado',
    },
  ];

  const columns = [
    'Servicio',
    'Empresas',
    'Contacto',
    'Fecha/Hora',
    'Estado',
    'Acciones',
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell textAlign="center" gr key={index}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.servicio}</TableCell>
              <TableCell>{row.empresas}</TableCell>
              <TableCell>{row.contacto}</TableCell>
              <TableCell>{row.fechaHora}</TableCell>
              <TableCell>{row.estado}</TableCell>
              <TableCell>
                <Tooltip title="Ver Servicio Solitado" arrow>
                  <IconButton edge="end" aria-label="view" onClick={{}}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Solicitar Turno" arrow>
                  <IconButton
                    edge="end"
                    aria-label="add-step"
                    hovered="Agregar step"
                    onClick={{}}
                  >
                    <CalendarMonthIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Borrar" arrow>
                  <IconButton edge="end" aria-label="Enviar Tarea" onClick={{}}>
                    <ChecklistIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Enviar Formulario" arrow>
                  <IconButton edge="end" aria-label="edit" onClick={{}}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
