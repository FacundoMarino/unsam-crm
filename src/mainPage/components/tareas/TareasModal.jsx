import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getShiftsTypes } from '../../../store/shift/thunks';

export const TareasModal = ({ open, handleClose, iconTitle }) => {
  const [selectedTurno, setSelectedTurno] = useState();
  const [selectedEmpresa, setSelectedEmpresa] = useState();
  const [textareaValue, setTextareaValue] = useState('');

  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const turnos = useSelector((state) => state.shift.shiftsTypes);

  useEffect(() => {
    if (iconTitle === 'Solicitar Turno') {
      dispatch(getShiftsTypes({ telekinesis }));
    }
  }, []);
  const handleSubmit = () => {
    // Lógica para enviar el formulario
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{iconTitle}</DialogTitle>
      <DialogContent>
        {iconTitle === 'Solicitar Turno' && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="turno-select-label">Turno</InputLabel>
              <Select
                labelId="turno-select-label"
                id="turno-select"
                value={selectedTurno}
                onChange={(e) => setSelectedTurno(e.target.value)}
              >
                {turnos?.map((turno) => (
                  <MenuItem key={turno} value={turno}>
                    {turno}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="empresa-select-label">Empresa</InputLabel>
              <Select
                labelId="empresa-select-label"
                id="empresa-select"
                value={selectedEmpresa}
                onChange={(e) => setSelectedEmpresa(e.target.value)}
              >
                {/* Opciones del select de empresa */}
                <MenuItem value="empresa1">Empresa 1</MenuItem>
                <MenuItem value="empresa2">Empresa 2</MenuItem>
                {/* Agrega más opciones según sea necesario */}
              </Select>
            </FormControl>
            <TextField
              label="Comentarios"
              multiline
              rows={4}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit}
            >
              Enviar
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
