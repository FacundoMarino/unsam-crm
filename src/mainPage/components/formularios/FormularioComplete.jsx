import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFormFromId,
  responseQuestionForm,
  updateQuestionForm,
} from '../../../store/forms/thunks';
import { setFormId } from '../../../store/forms/formSlider';
import { updateTask } from '../../../store/tasks/thunks';

export const FormularioComplete = () => {
  const formIndividual = useSelector((state) => state.forms.individualForm);
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const form_id = useSelector((state) => state.forms.formId);
  const role = useSelector((state) => state.auth.rol);
  const enterprise_id = useSelector((state) => state.auth.enterprise_id);
  const idTask = useSelector((state) => state.tasks.taskId);
  const dispatch = useDispatch();

  const [radioValues, setRadioValues] = useState({});
  const [currentForm, setCurrentForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [MAX_STEP, setMAX_STEP] = useState(1);
  const [selectedRadioStep, setSelectedRadioStep] = useState(null);
  const [inputError, setInputError] = useState('');
  const [response, setResponse] = useState({});

  const handleNumberChange = (id, value, min, max) => {
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      setRadioValues((prevValues) => ({
        ...prevValues,
        [id]: '', // Limpiar el valor si no es un número válido
      }));
    } else if (parsedValue < min || parsedValue > max) {
      setInputError(`El valor debe estar entre ${min} y ${max}`);
    } else {
      setInputError('');
      setRadioValues((prevValues) => ({
        ...prevValues,
        [id]: parsedValue,
      }));

      // Actualizar currentForm con la respuesta del usuario
      setCurrentForm((prevForm) => {
        const updatedForm = [...prevForm];
        updatedForm[currentStep][id] = {
          ...updatedForm[currentStep][id],
          response: parsedValue,
        };
        return updatedForm;
      });
    }
  };
  const handleRadioChange = (id, value) => {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    if (value) {
      setSelectedRadioStep(value - 1);
    } else {
      setSelectedRadioStep(null);
    }
  };

  const handleResetForm = () => {
    setRadioValues({});
    setCurrentForm(formIndividual);
  };
  const handleSubmit = () => {
    if (selectedRadioStep) {
      // If there's a selectedRadioStep, navigate to that step
      setCurrentStep(selectedRadioStep);
    } else {
      // Otherwise, proceed to the next step
      setCurrentStep((prevStep) => prevStep + 1);
    }
    if (currentStep === MAX_STEP) {
      dispatch(
        responseQuestionForm({ telekinesis, form_id, data: currentForm[0] }),
      );
      dispatch(
        updateTask({
          telekinesis,
          enterprise_id,
          status: 2,
          id: idTask,
        }),
      );
    }
  };

  const handleFormChange = (index) => {
    setCurrentForm(formIndividual);
  };
  const handleInputChange = (id, value) => {
    // Actualizar el estado response
    setResponse((prevResponse) => ({
      ...prevResponse,
      [id]: value,
    }));

    // Actualizar currentForm con la respuesta del usuario
    setCurrentForm((prevForm) => {
      const updatedForm = [...prevForm];
      const currentQuestion = updatedForm[currentStep].find(
        (question) => question.id === id,
      );

      console.log('currentQuestion:', currentQuestion);
      // Verificar si se encontró la pregunta actual
      if (currentQuestion) {
        // Construir un nuevo objeto de pregunta con la propiedad "response"
        const updatedQuestion = {
          ...currentQuestion,
          response: value,
        };
        // Reemplazar la pregunta original con la actualizada en el formulario
        updatedForm[currentStep] = updatedForm[currentStep].map((question) =>
          question.id === id ? updatedQuestion : question,
        );
      }
      return updatedForm;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getFormFromId({ telekinesis, form_id }));
  }, [form_id]);

  useEffect(() => {
    if (formIndividual) {
      setCurrentForm(formIndividual);
      setMAX_STEP(currentForm?.length - 1);
      setIsLoading(false);
    }
  }, [formIndividual]);

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form>
          <Typography marginBottom={2} marginTop={2} variant="h5">
            {role === 'Admin' ? 'Pre Visualización' : 'Complete el Formulario'}
          </Typography>
          <Divider />
          {isLoading && (
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
          {!isLoading &&
            form_id &&
            currentForm &&
            currentForm[currentStep]?.map((item) => (
              <div key={item.id}>
                {(() => {
                  switch (item.tipo) {
                    case 'texto':
                      return (
                        <>
                          <div>
                            <Typography
                              marginBottom={2}
                              marginTop={4}
                              variant="h5"
                            >
                              {item.pregunta}
                            </Typography>
                            <TextField
                              fullWidth
                              key={item.id}
                              label={item.pregunta}
                              variant="outlined"
                              onChange={(e) =>
                                handleInputChange(item.id, e.target.value)
                              }
                              required={item.requerido === 1}
                            />
                          </div>
                          <Divider />
                        </>
                      );
                    case 'numero':
                      return (
                        <>
                          <div>
                            <Typography
                              marginBottom={2}
                              marginTop={4}
                              variant="h5"
                            >
                              {item.pregunta}
                            </Typography>
                            <TextField
                              fullWidth
                              key={item.id}
                              label={item.pregunta}
                              variant="outlined"
                              required={item.requerido === 1}
                              type="number"
                              error={Boolean(inputError)}
                              helperText={inputError}
                              inputProps={{
                                min: item.min,
                                max: item.max,
                              }}
                              value={radioValues[item.id] || ''}
                              onChange={(e) =>
                                handleNumberChange(
                                  item.id,
                                  e.target.value,
                                  item.min,
                                  item.max,
                                )
                              }
                            />
                          </div>
                          <Divider />
                        </>
                      );
                    case 'checkbox':
                      return (
                        <>
                          <div>
                            <Typography
                              marginBottom={2}
                              marginTop={2}
                              variant="h5"
                            >
                              {item.pregunta}
                            </Typography>
                            {item.opciones.map((opcion, index) => (
                              <FormControlLabel
                                key={index}
                                control={<Checkbox />}
                                label={opcion}
                                onChange={(e) =>
                                  handleInputChange(item.id, e.target.value)
                                }
                              />
                            ))}
                          </div>
                          <Divider />
                        </>
                      );
                    case 'textarea':
                      return (
                        <>
                          <Typography
                            marginBottom={2}
                            marginTop={2}
                            variant="h5"
                          >
                            {item.pregunta}
                          </Typography>
                          <TextareaAutosize
                            aria-label={item.pregunta}
                            minRows={3}
                            style={{
                              width: '100%',
                              height: '100px',
                              resize: 'none',
                            }}
                            placeholder={item.pregunta}
                            onChange={(e) =>
                              handleInputChange(item.id, e.target.value)
                            }
                          />
                          <Divider />
                        </>
                      );
                    case 'radio':
                      return (
                        <div key={item.id}>
                          <Typography
                            marginBottom={2}
                            marginTop={2}
                            variant="h5"
                          >
                            {item.pregunta}
                          </Typography>
                          <RadioGroup
                            value={radioValues[item.id] || ''}
                            onChange={(e) =>
                              handleRadioChange(item.id, e.target.value)
                            }
                          >
                            {item.opciones.map((opcion, index) => (
                              <FormControlLabel
                                key={index}
                                value={opcion.step_redirect}
                                control={<Radio />}
                                label={opcion.value}
                              />
                            ))}
                          </RadioGroup>
                          <Divider />
                        </div>
                      );

                    case 'fecha':
                      return (
                        <>
                          <div>
                            <Typography
                              marginBottom={2}
                              marginTop={2}
                              variant="h5"
                            >
                              {item.pregunta}
                            </Typography>
                            <TextField
                              key={item.id}
                              label={item.pregunta}
                              variant="outlined"
                              fullWidth
                              required={item.requerido === 1}
                              type="date"
                              onChange={(e) =>
                                handleInputChange(item.id, e.target.value)
                              }
                            />
                          </div>
                          <Divider />
                        </>
                      );

                    case 'min':
                    case 'max':
                      return (
                        <>
                          <div>
                            <Typography
                              marginBottom={2}
                              marginTop={2}
                              variant="h5"
                            >
                              {item.pregunta}
                            </Typography>
                            <TextField
                              key={item.id}
                              label={item.pregunta}
                              variant="outlined"
                              fullWidth
                              required={item.requerido === 1}
                              type="number"
                              onChange={(e) =>
                                handleInputChange(item.id, e.target.value)
                              }
                            />
                          </div>
                          <Divider />
                        </>
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetForm}
            startIcon={<Refresh />}
            disabled={role === 'Admin'}
            style={{ marginRight: '10px', marginTop: '20px' }}
          >
            Reiniciar Formulario
          </Button>
          <Button
            disabled={role === 'Admin'}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Enviar Formulario
          </Button>
          {role === 'Admin' && (
            <>
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
            </>
          )}
        </form>
      </Paper>
    </Container>
  );
};
