import React, { useEffect, useState } from 'react';
import {
  Paper,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Divider,
  MenuItem,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFormReport,
  getServiceReport,
  getUserReport,
} from '../../../../store/report/thunks';
import { getAllForms } from '../../../../store/forms/thunks';

export const Reportes = () => {
  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateEnd, setSelectedDateTwo] = useState('');
  const [selectedDateForm, setSelectedDateForm] = useState('');
  const [selectedDateEndForm, setSelectedDateEndForm] = useState('');
  const [selectedDateUser, setSelectedDateUser] = useState('');
  const [selectedDateEndUser, setSelectedDateTwoUser] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const forms = useSelector((state) => state.forms.form.forms);

  const saveAndSendData = () => {
    dispatch(
      getServiceReport({
        telekinesis,
        fecha_desde: selectedDate,
        fecha_hasta: selectedDateEnd,
      }),
    );
    setSelectedDate('');
    setSelectedDateTwo('');
  };

  const saveFormData = () => {
    dispatch(
      getFormReport({
        telekinesis,
        fecha_desde: selectedDateForm,
        fecha_hasta: selectedDateEndForm,
        form_id: selectedForm,
      }),
    );
    setSelectedDateForm('');
    setSelectedDateEndForm('');
  };

  const saveUserData = () => {
    dispatch(
      getUserReport({
        telekinesis,
        fecha_desde: selectedDateUser,
        fecha_hasta: selectedDateEndUser,
      }),
    );
    setSelectedDateUser('');
    setSelectedDateTwoUser('');
  };

  useEffect(() => {
    dispatch(getAllForms({ telekinesis }));
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={4} style={{ height: '500px' }}>
        <Paper elevation={3} style={{ padding: '36px', height: '100%' }}>
          <Grid container style={{ gap: '15px' }}>
            <div>
              <h2>Reporte de Servicios</h2>
            </div>
            <Divider />
            <h2>Selecciona la fecha Inicial</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              locale={es}
              dateFormat="dd/MM/yyyy"
              showPopperArrow={false}
            />
            <h2>Selecciona la fecha Final</h2>
            <DatePicker
              selected={selectedDateEnd}
              onChange={(date) => setSelectedDateTwo(date)}
              locale={es}
              dateFormat="dd/MM/yyyy"
              showPopperArrow={false}
            />{' '}
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              style={{ marginTop: '10px' }}
            >
              <Button
                variant="contained"
                style={{ marginLeft: '10px', backgroundColor: '#6A51e1' }}
                onClick={saveAndSendData}
              >
                Exportar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} style={{ height: '500px' }}>
        <Paper elevation={3} style={{ padding: '36px', height: '100%' }}>
          <Grid container style={{ gap: '15px' }}>
            <div>
              <h2>Reporte de Usuarios</h2>
            </div>
            <Divider />
            <h2>Selecciona la fecha Inicial</h2>
            <DatePicker
              selected={selectedDateUser}
              onChange={(date) => setSelectedDateUser(date)}
              locale={es}
              dateFormat="dd/MM/yyyy"
              showPopperArrow={false}
            />
            <h2>Selecciona la fecha Final</h2>
            <DatePicker
              selected={selectedDateEndUser}
              onChange={(date) => setSelectedDateTwoUser(date)}
              locale={es}
              dateFormat="dd/MM/yyyy"
              fullWidth
              showPopperArrow={false}
            />
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              style={{ marginTop: '10px' }}
            >
              <Button
                variant="contained"
                style={{ marginLeft: '10px', backgroundColor: '#6A51e1' }}
                onClick={saveUserData}
              >
                Exportar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} style={{ height: '500px' }}>
        <Paper elevation={3} style={{ padding: '36px', height: '100%' }}>
          <h2>Reporte de Formularios</h2>
          <Divider />
          <FormControl fullWidth margin="normal">
            <InputLabel id="turno-select-label">Formulario</InputLabel>
            <Select
              labelId="turno-select-label"
              id="turno-select"
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
            >
              {forms?.map((form) => (
                <MenuItem key={form.id} value={form.id}>
                  {form.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h2>Selecciona la fecha Inicial</h2>
          <DatePicker
            selected={selectedDateForm}
            onChange={(date) => setSelectedDateForm(date)}
            locale={es}
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
          />
          <h2>Selecciona la fecha Final</h2>
          <DatePicker
            selected={selectedDateEndForm}
            onChange={(date) => setSelectedDateEndForm(date)}
            locale={es}
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
          />
          <Grid
            item
            xs={12}
            container
            justifyContent="flex-end"
            style={{ marginTop: '10px' }}
          >
            <Button
              variant="contained"
              style={{ marginLeft: '10px', backgroundColor: '#6A51e1' }}
              onClick={saveFormData}
            >
              Exportar
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
