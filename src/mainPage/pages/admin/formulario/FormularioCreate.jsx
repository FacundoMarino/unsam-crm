// src/components/Formulario.js
import React, { useState } from 'react';
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

export const FormularioCreate = () => {
  const initialState = {
    id: Date.now(),
    tipo: 'texto',
    pregunta: '',
    opciones: [''],
    requerido: false,
  };

  const [formFields, setFormFields] = useState([initialState]);

  const handleFieldChange = (id, property, value) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, [property]: value } : field,
    );
    setFormFields(updatedFields);
  };

  const handleAddField = () => {
    const newField = { ...initialState, id: Date.now() };
    setFormFields([...formFields, newField]);
  };

  const handleRemoveField = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const handleAddOption = (id) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, opciones: [...field.opciones, ''] } : field,
    );
    setFormFields(updatedFields);
  };

  const handleRemoveOption = (id, optionIndex) => {
    const updatedFields = formFields.map((field) =>
      field.id === id
        ? {
            ...field,
            opciones: field.opciones.filter(
              (_, index) => index !== optionIndex,
            ),
          }
        : field,
    );
    setFormFields(updatedFields);
  };

  const handleResetForm = () => {
    setFormFields([initialState]);
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formFields);
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
                label={`Pregunta ${field.id}`}
                value={field.pregunta}
                onChange={(e) =>
                  handleFieldChange(field.id, 'pregunta', e.target.value)
                }
              />
              <FormControl fullWidth>
                <InputLabel>Tipo de Campo</InputLabel>
                <Select
                  value={field.tipo}
                  onChange={(e) =>
                    handleFieldChange(field.id, 'tipo', e.target.value)
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
                      handleFieldChange(field.id, 'requerido', e.target.checked)
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
                          handleFieldChange(
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
                        onClick={() => handleRemoveOption(field.id, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleAddOption(field.id)}
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
                          handleFieldChange(
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
                        onClick={() => handleRemoveOption(field.id, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleAddOption(field.id)}
                    startIcon={<AddIcon />}
                  >
                    Agregar Opción
                  </Button>
                </div>
              )}
              <IconButton
                color="secondary"
                onClick={() => handleRemoveField(field.id)}
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
          onClick={handleAddField}
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
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          Enviar Formulario
        </Button>
      </Paper>
    </Container>
  );
};
