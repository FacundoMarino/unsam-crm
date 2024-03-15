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
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

export const TurnosGestion = ({
  handleNuevoTurnoClick,
  setDisplayCreateShift,
}) => {
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shiftType);
  const adminStatus = useSelector((state) => state.shift.adminStatus);
  const telekinesis = useSelector((state) => state.auth.telekinesis);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getShiftsTypes({ telekinesis }));
    setDisplayCreateShift('none');
  }, [dispatch, telekinesis, setDisplayCreateShift]);

  useEffect(() => {
    if (adminStatus === 'ok') {
      dispatch(getShiftsTypes({ telekinesis }));
    }
    dispatch(setAdminStatus(''));
  }, [adminStatus, dispatch, telekinesis]);

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
    setDisplayCreateShift('');
  };

  return (
    <Container>
      <Grid container justifyContent={'flex-end'} alignItems={'center'}>
        <Button
          style={{ backgroundColor: '#6A51e1', color: 'white', margin: 5 }}
          onClick={handleNuevoTurno}
          startIcon={<AddIcon />}
        >
          Nuevo Formulario
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  textAlign: 'center',
                  borderBottom: '2.5px solid #6A51e1',
                  fontWeight: 'bold',
                  width: '50%',
                }}
              >
                TURNO
              </TableCell>
              <TableCell
                style={{
                  textAlign: 'center',
                  borderBottom: '2.5px solid #6A51e1',
                  fontWeight: 'bold',
                  width: '50%',
                }}
              >
                ACCIONES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts?.map((turno) => (
              <TableRow key={turno.shift_type}>
                <TableCell
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {turno.shift_type}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                  }}
                >
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TurnosModalEdit open={isModalOpen} handleClose={handleCloseModal} />
    </Container>
  );
};
