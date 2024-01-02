import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Refresh } from '@mui/icons-material';

export const FormularioEditorItem = ({
  formFields,
  onAddField,
  onDeleteField,
  onAddOption,
  onRemoveOption,
  onSubmit,
  onFieldChanged,
}) => {
  const initialState = {
    tipo: 'texto',
    pregunta: '',
    opciones: [''],
    requerido: false,
  };

  const [fields, setFields] = useState([]);

  useEffect(() => {
    // Inicializa el estado con los datos del formulario proporcionados
    setFields(formFields);
  }, [formFields]);

  const handleResetForm = () => {
    // Restablece los campos a su estado inicial
    setFields([formFields]);
  };
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">Crea tu formulario</Typography>
        <Grid container spacing={2}>
          {formFields.map((field) => (
            <Grid item xs={12} key={field.id}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label={`Pregunta`}
                value={field.pregunta}
                onChange={(e) =>
                  onFieldChanged(field.id, 'pregunta', e.target.value)
                }
              />
              <FormControl fullWidth>
                <InputLabel>Tipo de Campo</InputLabel>
                <Select
                  value={field.tipo}
                  onChange={(e) =>
                    onFieldChanged(field.id, 'tipo', e.target.value)
                  }
                >
                  <MenuItem value="texto">Texto</MenuItem>
                  <MenuItem value="numero">Número</MenuItem>
                  <MenuItem value="checkbox">Casilla de Verificación</MenuItem>
                  <MenuItem value="textarea">Área de Texto</MenuItem>
                  <MenuItem value="radio">Botones de Radio</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.requerido}
                    onChange={(e) =>
                      onFieldChanged(field.id, 'requerido', e.target.checked)
                    }
                  />
                }
                label="Requerido"
              />
              {field.tipo === 'checkbox' && (
                <div style={{ marginTop: '10px' }}>
                  {field.opciones.map((opcion, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={`Opción ${index + 1}`}
                        value={opcion}
                        onChange={(e) =>
                          onFieldChanged(
                            field.id,
                            'opciones',
                            field.opciones.map((opt, idx) =>
                              idx === index ? e.target.value : opt,
                            ),
                          )
                        }
                      />
                      <IconButton
                        color="secondary"
                        onClick={() => onRemoveOption(field.id, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onAddOption(field.id)}
                    startIcon={<AddIcon />}
                  >
                    Agregar Opción
                  </Button>
                </div>
              )}
              {field.tipo === 'radio' && (
                <div style={{ marginTop: '10px' }}>
                  {field.opciones.map((opcion, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={`Opción ${index + 1}`}
                        value={opcion}
                        onChange={(e) =>
                          onFieldChanged(
                            field.id,
                            'opciones',
                            field.opciones.map((opt, idx) =>
                              idx === index ? e.target.value : opt,
                            ),
                          )
                        }
                      />
                      <IconButton
                        color="secondary"
                        onClick={() => onRemoveOption(field.id, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onAddOption(field.id)}
                    startIcon={<AddIcon />}
                  >
                    Agregar Opción
                  </Button>
                </div>
              )}
              <IconButton
                color="secondary"
                onClick={() => onDeleteField(field.id)}
              >
                <DeleteIcon />
              </IconButton>
              <Divider />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddField}
          startIcon={<AddIcon />}
          style={{ marginTop: '20px', marginRight: '10px' }}
        >
          Agregar Pregunta
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetForm}
          startIcon={<Refresh />}
          style={{ marginRight: '10px', marginTop: '20px' }}
        >
          Reiniciar Formulario
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          style={{ marginTop: '20px' }}
        >
          Enviar Formulario
        </Button>
      </Paper>
    </Container>
  );
};
