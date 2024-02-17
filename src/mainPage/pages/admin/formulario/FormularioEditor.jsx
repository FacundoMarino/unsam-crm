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
  CircularProgress,
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
    opciones: [{ value: '', step_redirect: '' }],
    requerido: false,
    min: '',
    max: '',
    fecha: '',
    step: '',
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [formFields, setFormFields] = useState([]);
  const [MAX_STEP, setMAX_STEP] = useState(1);
  const [stepName, setStepName] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const handleFieldChange = (id, property, value) => {
    setFormFields((prevFormFields) => {
      const updatedFields = JSON.parse(JSON.stringify(prevFormFields));

      updatedFields[currentStep] = updatedFields[currentStep].map((field) => {
        if (field.id === id && field.tipo === 'radio') {
          return {
            ...field,
            [property]: value,
            opciones: value?.map((opt) => ({
              value: opt.value,
              step_redirect: opt.step_redirect || '',
            })),
          };
        } else {
          return field.id === id ? { ...field, [property]: value } : field;
        }
      });

      return updatedFields;
    });
  };

  const handleAddField = () => {
    setFormFields((prevFormFields) => {
      const updatedFields = JSON.parse(JSON.stringify(prevFormFields));
      const newField = { ...initialState, id: Date.now(), step: currentStep };

      updatedFields[currentStep].push(newField);
      return updatedFields;
    });
  };

  const handleRemoveField = (id) => {
    setFormFields((prevFormFields) => {
      const updatedFields = JSON.parse(JSON.stringify(prevFormFields));
      updatedFields[currentStep] = updatedFields[currentStep].filter(
        (field) => field.id !== id,
      );
      return updatedFields;
    });
  };

  const handleAddOption = (id) => {
    setFormFields((prevFormFields) => {
      const updatedFields = JSON.parse(JSON.stringify(prevFormFields));
      updatedFields[currentStep] = updatedFields[currentStep].map((field) =>
        field.id === id
          ? { ...field, opciones: [...field.opciones, ''] }
          : field,
      );

      return updatedFields;
    });
  };

  const handleRemoveOption = (id, optionIndex) => {
    setFormFields((prevFormFields) => {
      const updatedFields = JSON.parse(JSON.stringify(prevFormFields));
      updatedFields[currentStep] = updatedFields[currentStep].map((field) =>
        field.id === id
          ? {
              ...field,
              opciones: field.opciones.filter(
                (_, index) => index !== optionIndex,
              ),
            }
          : field,
      );
      return updatedFields;
    });
  };

  const handleSubmit = () => {
    const data = formFields.flatMap((innerArray) => innerArray);
    dispatch(updateQuestionForm({ telekinesis, form_id, data }));
    dispatch(setFormId(''));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getFormFromId({ telekinesis, form_id }));
  }, [form_id]);

  useEffect(() => {
    if (formIndividual) {
      setFormFields(formIndividual);
      setIsLoading(false);
      setMAX_STEP(formFields?.length - 1);
    }
  }, [formIndividual]);

  const findFormNameById = (formArray, targetFormId) => {
    const foundForm = formArray.find((form) => form.id === targetFormId);
    return foundForm ? foundForm.name : null;
  };

  useEffect(() => {
    if (formFields) {
      const stepNames = formFields.flatMap((i) => i);
      const uniqueStepsSet = new Set();
      const replacedNullValues = stepNames.map((i) => {
        if (i.step !== null && !uniqueStepsSet.has(i.step)) {
          uniqueStepsSet.add(i.step);
          return i.step_name !== null ? i.step_name : i.step;
        }
        return null;
      });

      setStepName({
        uniqueStepNames: replacedNullValues.filter((name) => name !== null),
        uniqueSteps: Array.from(uniqueStepsSet),
      });
    }
    setFormIdCreate('');
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

      {isLoading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && form_id && (
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5">
            {`Edita el Formulario: ${findFormNameById(form.forms, form_id)} - ${
              formIndividual[currentStep][0].step_name
            }
            `}
          </Typography>
          <Grid container spacing={2}>
            {formFields[currentStep]?.map((field) => (
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
                      <div
                        key={index}
                        style={{
                          marginBottom: '10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <TextField
                          variant="outlined"
                          margin="normal"
                          label={`Opción ${index + 1}`}
                          style={{ width: '90%' }}
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
                      <Grid
                        container
                        spacing={2}
                        key={index}
                        style={{ marginBottom: '10px' }}
                      >
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={`Opción ${index + 1}`}
                            value={opcion.value}
                            onChange={(e) =>
                              handleFieldChange(
                                field.id,
                                'opciones',
                                field.opciones.map((opt, idx) =>
                                  idx === index
                                    ? { ...opt, value: e.target.value }
                                    : opt,
                                ),
                              )
                            }
                          />
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          style={{ marginBottom: '8px', marginTop: '16px' }}
                        >
                          <FormControl fullWidth>
                            <InputLabel>Seleccionar Step</InputLabel>
                            <Select
                              value={opcion.step_redirect}
                              onChange={(e) =>
                                handleFieldChange(
                                  field.id,
                                  'opciones',
                                  field.opciones.map((opt, idx) =>
                                    idx === index
                                      ? {
                                          ...opt,
                                          step_redirect: e.target.value,
                                        }
                                      : opt,
                                  ),
                                )
                              }
                            >
                              {stepName?.uniqueStepNames.map((step, index) => (
                                <MenuItem
                                  key={index}
                                  value={stepName?.uniqueSteps[index]}
                                >
                                  {step}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <IconButton
                          color="secondary"
                          onClick={() => handleRemoveOption(field.id, index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentStep(currentStep - 1)}
            style={{
              marginTop: '20px',
              marginRight: '10px',
              marginLeft: '10px',
            }}
            disabled={currentStep === 0}
          >
            Paso Anterior
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentStep(currentStep + 1)}
            style={{ marginTop: '20px' }}
            disabled={currentStep === MAX_STEP}
          >
            Siguiente Paso
          </Button>
        </Paper>
      )}
    </Container>
  );
};
