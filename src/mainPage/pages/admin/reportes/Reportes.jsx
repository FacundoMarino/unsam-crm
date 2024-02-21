import React, { useState } from 'react';
import {
  Paper,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
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

export const Reportes = () => {
  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateEnd, setSelectedDateTwo] = useState('');
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
  };

  const saveFormData = () => {
    dispatch(
      getFormReport({
        telekinesis,
        fecha_desde: selectedDate,
        fecha_hasta: selectedDateEnd,
        form_id: selectedForm,
      }),
    );
  };

  const saveUserData = () => {
    dispatch(
      getUserReport({
        telekinesis,
        fecha_desde: selectedDate,
        fecha_hasta: selectedDateEnd,
      }),
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '36px' }}>
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
              color="primary"
              style={{ marginLeft: '10px' }}
              onClick={saveAndSendData}
            >
              Guardar y Enviar
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '36px' }}>
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
              color="primary"
              style={{ marginLeft: '10px' }}
              onClick={saveUserData}
            >
              Guardar y Enviar
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '36px' }}>
          <h2>Selecciona el Formulario</h2>
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
              color="primary"
              style={{ marginLeft: '10px' }}
              onClick={saveFormData}
            >
              Guardar y Enviar
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
