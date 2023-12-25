import React, { useEffect } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getShiftsTypes } from '../../../store/shift/thunks';
import { useDispatch, useSelector } from 'react-redux';

export const TurnosGestion = ({ handleNuevoTurnoClick }) => {
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shiftType);
  const telekinesis = useSelector((state) => state.auth.telekinesis);

  // Aquí deberías hacer la llamada a tu API para obtener la lista de turnos
  useEffect(() => {
    dispatch(getShiftsTypes({ telekinesis }));
  }, [telekinesis]);

  const handleEditar = (id) => {
    // Lógica para editar el turno con el ID proporcionado
    console.log(`Editar turno con ID: ${id}`);
  };

  const handleEliminar = (id) => {
    // Lógica para eliminar el turno con el ID proporcionado
    console.log(`Eliminar turno con ID: ${id}`);
  };

  const handleNuevoTurno = () => {
    // Lógica para agregar un nuevo turno
    console.log('Agregar nuevo turno');
    // Llama a la función proporcionada para cambiar al índice correspondiente
    handleNuevoTurnoClick();
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Turnos
          </Typography>
          <Button
            color="inherit"
            onClick={handleNuevoTurno}
            startIcon={<AddIcon />}
          >
            Nuevo Turno
          </Button>
        </Toolbar>
      </AppBar>

      <List>
        {shifts.map((turno) => (
          <ListItem key={turno}>
            <ListItemText primary={turno} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditar(turno.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleEliminar(turno.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
