import { Grid, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

export const DateSection = ({
  selectedOption,
  setSelectedDate,
  isDayDisabled,
}) => (
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: '36px' }}>
      <h2>Selecciona la fecha</h2>
      <DatePicker
        selected={selectedOption ? new Date() : null}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        filterDate={isDayDisabled}
        locale={es}
        dateFormat="dd/MM/yyyy"
        showPopperArrow={false}
        disabled={!selectedOption}
      />
    </Paper>
  </Grid>
);
