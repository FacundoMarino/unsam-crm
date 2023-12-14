import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';

export const TimeSection = ({
  selectedDate,
  selectedLocation,
  setSelectedTime,
  optionsHoras,
}) => (
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: '20px' }}>
      <h2>Selecciona la hora</h2>
      <FormControl fullWidth>
        <InputLabel id="hora-select-label">Selecciona la hora</InputLabel>
        <Select
          labelId="hora-select-label"
          id="hora-select"
          onChange={(event) => setSelectedTime(event.target.value)}
          disabled={!selectedDate || !selectedLocation}
        >
          {optionsHoras.map((hora) => (
            <MenuItem key={hora} value={hora}>
              {hora}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  </Grid>
);
