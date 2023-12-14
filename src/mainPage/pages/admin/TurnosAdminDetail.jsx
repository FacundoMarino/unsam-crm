import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
  Box,
} from '@mui/material';

export const TurnosAdminDetail = ({ turno, open, onClose }) => {
  const onMarcarFinalizado = (turnoId) => {
    // Lógica para marcar el turno como finalizado
    console.log(`Marcar como finalizado: ${turnoId}`);
    onClose();
  };

  const onMarcarAusente = (turnoId) => {
    // Lógica para marcar el turno como ausente
    console.log(`Marcar como ausente: ${turnoId}`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5">{`Detalle del Turno - ${turno.id}`}</Typography>
            <Typography>{`Nombre: ${turno.nombre}`}</Typography>
            <Typography>{`Hora: ${turno.start.toLocaleTimeString()}`}</Typography>
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
              onClick={() => onMarcarFinalizado(turno.id)}
              sx={{
                padding: '10px 20px',
                marginRight: '10px',
                marginTop: '10px',
              }}
            >
              Marcar como Finalizado
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onMarcarAusente(turno.id)}
              sx={{
                padding: '10px 20px',
                marginRight: '10px',
                marginTop: '10px',
              }}
            >
              Marcar como Ausente
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
