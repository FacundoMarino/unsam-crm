import React, { useState } from 'react';
import { Paper, Button, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

export const Reportes = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateEnd, setSelectedDateTwo] = useState('');

  const saveAndSendData = () => {
    console.log('Selected dates:', selectedDate, selectedDateEnd);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '36px' }}>
          <h2>Selecciona la fecha Inicial</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            locale={es}
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '36px' }}>
          <h2>Selecciona la fecha Final</h2>
          <DatePicker
            selected={selectedDateEnd}
            onChange={(date) => setSelectedDateTwo(date)}
            minDate={new Date()}
            locale={es}
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
          />
        </Paper>

        {/* Botones */}
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
      </Grid>
    </Grid>
  );
};
