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
import { useDispatch, useSelector } from 'react-redux';
import {
  getFormFromId,
  updateQuestionForm,
} from '../../../../store/forms/thunks';
import { setFormId, setFormIdCreate } from '../../../../store/forms/formSlider';

export const FormularioEditor = () => {
  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const form_id = useSelector((state) => state.forms.formId);
  const formIndividual = useSelector((state) => state.forms.individualForm);
  const form = useSelector((state) => state.forms.form);

  const initialState = {
    id: Date.now(),
    tipo: 'texto',
    pregunta: '',
    opciones: [''],
    requerido: false,
    min: '',
    max: '',
    fecha: '',
    step: '',
  };

  const [formFields, setFormFields] = useState([]);

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

  const handleSubmit = () => {
    dispatch(updateQuestionForm({ telekinesis, form_id, data: formFields }));
    dispatch(setFormId(''));
  };

  useEffect(() => {
    dispatch(getFormFromId({ telekinesis, form_id }));
  }, [form_id]);

  useEffect(() => {
    if (formIndividual) {
      setFormFields(formIndividual[1]);
    }
  }, [formIndividual]);

  useEffect(() => {
    dispatch(setFormIdCreate(''));
  }, []);

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '20px' }}>
      {!form_id && (
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" textAlign={'center'}>
            Seleccionar un Formulario en Administración de Formularios
          </Typography>
        </Paper>
      )}
      {form_id && (
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5">
            {' '}
            {`Edita el Formulario: ${form.forms[0].name}`}
          </Typography>
          <Grid container spacing={2}>
            {formFields?.map((field) => (
              <Grid item xs={12} key={field.id}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label={`Pregunta`}
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
                    <MenuItem value="checkbox">Opciones Multiple</MenuItem>
                    <MenuItem value="textarea">Área de Texto</MenuItem>
                    <MenuItem value="radio">Opción Unica</MenuItem>
                    <MenuItem value="fecha">Fecha</MenuItem>
                    <MenuItem value="min">Mínimo</MenuItem>
                    <MenuItem value="max">Máximo</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.requerido}
                      onChange={(e) =>
                        handleFieldChange(
                          field.id,
                          'requerido',
                          e.target.checked,
                        )
                      }
                    />
                  }
                  label="Requerido"
                />
                {['min', 'max', 'step'].includes(field.tipo) && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={
                      field.tipo === 'min'
                        ? 'Mínimo'
                        : field.tipo === 'max'
                          ? 'Máximo'
                          : 'Step'
                    }
                    type="number"
                    value={field[field.tipo]}
                    onChange={(e) =>
                      handleFieldChange(field.id, field.tipo, e.target.value)
                    }
                  />
                )}
                {field.tipo === 'fecha' && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Fecha"
                    type="date"
                    value={field.fecha}
                    onChange={(e) =>
                      handleFieldChange(field.id, 'fecha', e.target.value)
                    }
                  />
                )}
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
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Actualizar Formulario
          </Button>
        </Paper>
      )}
    </Container>
  );
};
