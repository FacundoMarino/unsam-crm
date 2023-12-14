import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';

export const LocationSection = ({ locations, setSelectedLocation }) => (
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: '20px' }}>
      <h2>Selecciona el tipo de cita</h2>
      <FormControl fullWidth>
        <InputLabel id="location-select-label">Tipo de Cita</InputLabel>
        <Select
          labelId="location-select-label"
          id="location-select"
          onChange={(event) => setSelectedLocation(event.target.value)}
        >
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  </Grid>
);
