import React, { useEffect, useState } from 'react';
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
import {
  deleteShift,
  getShiftId,
  getShiftsTypes,
} from '../../../store/shift/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { TurnosModalEdit } from '../../components/turnos/TurnosModalEdit';
import { setAdminStatus } from '../../../store/shift/shiftSlider';

export const TurnosGestion = ({ handleNuevoTurnoClick }) => {
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shiftType);
  const adminStatus = useSelector((state) => state.shift.adminStatus);
  const telekinesis = useSelector((state) => state.auth.telekinesis);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getShiftsTypes({ telekinesis }));
  }, [dispatch]);

  useEffect(() => {
    if (adminStatus === 'ok') {
      dispatch(getShiftsTypes({ telekinesis }));
    }
    setAdminStatus('');
  }, [adminStatus]);

  const handleEditar = (id) => {
    dispatch(getShiftId({ telekinesis, id }));

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEliminar = (id) => {
    dispatch(deleteShift({ telekinesis, id }));
  };

  const handleNuevoTurno = () => {
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
        {shifts?.map((turno) => (
          <ListItem key={turno.shift_type}>
            <ListItemText primary={turno.shift_type} />
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

      <TurnosModalEdit open={isModalOpen} handleClose={handleCloseModal} />
    </Container>
  );
};
