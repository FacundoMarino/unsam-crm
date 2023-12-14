import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';

export const OptionSection = ({ options, setSelectedOption, resetFields }) => (
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: '20px' }}>
      <h2>Selecciona tu Turno</h2>
      <FormControl fullWidth>
        <InputLabel id="opcion-select-label" style={{ marginBottom: '8px' }}>
          Turno
        </InputLabel>
        <Select
          labelId="opcion-select-label"
          id="opcion-select"
          onChange={(event) => {
            setSelectedOption(event.target.value);
            resetFields();
          }}
        >
          {options.map((opcion) => (
            <MenuItem key={opcion.value} value={opcion.value}>
              {opcion.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  </Grid>
);
