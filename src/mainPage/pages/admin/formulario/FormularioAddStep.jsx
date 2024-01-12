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
import Swal from 'sweetalert2';

export const FormularioAddStep = () => {
  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const form_id = useSelector((state) => state.forms.formId);
  const formIndividual = useSelector((state) => state.forms.individualForm);
  const form = useSelector((state) => state.forms.form);

  const [isNewStep, setIsNewStep] = useState(0);

  useEffect(() => {
    const showConfirmation = async () => {
      const { value: newStepNumber } = await Swal.fire({
        title: 'Crear Nuevo Step',
        input: 'number',
        inputLabel: 'Ingrese el número del nuevo step',
        inputPlaceholder: 'Número del Step',
      });

      if (newStepNumber) {
        setIsNewStep(newStepNumber);
        setFormFields([{ ...initialState, step: newStepNumber }]);
      }
    };

    showConfirmation();
  }, []);

  const initialState = {
    id: Date.now(),
    tipo: 'texto',
    pregunta: '',
    opciones: [''],
    requerido: false,
    min: '',
    max: '',
    fecha: '',
    step: isNewStep,
  };

  const [formFields, setFormFields] = useState([
    { ...initialState, step: isNewStep },
  ]);
  const [formIndividualForm, setFormIndividualForm] = useState([]);

  const handleFieldChange = (id, property, value) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, [property]: value } : field,
    );
    setFormFields(updatedFields);
  };

  const handleAddField = () => {
    const newField = { ...initialState, id: Date.now(), step: isNewStep };
    console.log(newField);
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
    const formData = [...formFields, ...formIndividualForm];

    console.log(formData);

    /* dispatch(updateQuestionForm({ telekinesis, form_id, data: formData }));
    dispatch(setFormId(''));*/
  };

  useEffect(() => {
    dispatch(getFormFromId({ telekinesis, form_id }));
  }, [form_id]);

  useEffect(() => {
    if (formIndividual) {
      setFormIndividualForm(formIndividual[1]);
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
          <Typography variant="h5">Crea tu formulario</Typography>
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
                {['numero', 'fecha'].includes(field.tipo) && (
                  <>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label={field.tipo === 'numero' ? 'Número' : 'Fecha'}
                      type={field.tipo === 'numero' ? 'number' : 'date'}
                      value={field[field.tipo]}
                      onChange={(e) =>
                        handleFieldChange(field.id, field.tipo, e.target.value)
                      }
                    />
                    {field.tipo === 'numero' && (
                      <>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Mínimo"
                          type="number"
                          value={field.min}
                          onChange={(e) =>
                            handleFieldChange(field.id, 'min', e.target.value)
                          }
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Máximo"
                          type="number"
                          value={field.max}
                          onChange={(e) =>
                            handleFieldChange(field.id, 'max', e.target.value)
                          }
                        />
                      </>
                    )}
                    {field.tipo === 'fecha' && (
                      <>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Fecha Mínima"
                          type="date"
                          value={field.min}
                          onChange={(e) =>
                            handleFieldChange(field.id, 'min', e.target.value)
                          }
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Fecha Máxima"
                          type="date"
                          value={field.max}
                          onChange={(e) =>
                            handleFieldChange(field.id, 'max', e.target.value)
                          }
                        />
                      </>
                    )}
                  </>
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
            Enviar Formulario
          </Button>
        </Paper>
      )}
    </Container>
  );
};