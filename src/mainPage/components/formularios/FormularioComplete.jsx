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
import { getFormFromId } from '../../../store/forms/thunks';

export const FormularioComplete = () => {
  const formIndividual = useSelector((state) => state.forms.individualForm);
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const form_id = useSelector((state) => state.forms.formId);

  const dispatch = useDispatch();

  const [radioValues, setRadioValues] = useState({});
  const [currentForm, setCurrentForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [MAX_STEP, setMAX_STEP] = useState(1);
  const [selectedRadioStep, setSelectedRadioStep] = useState(null);

  const handleRadioChange = (id, value) => {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    // Check if the selected radio option has a step_redirect
    const selectedOption = currentForm[currentStep].find(
      (item) => item.id === id,
    );
    if (selectedOption && selectedOption.step_redirect) {
      const resultStep = Number(selectedOption.step_redirect) - 1;
      console.log('Selected Radio Step Before:', resultStep);

      setSelectedRadioStep(resultStep);
      console.log('Selected Radio Step:', selectedRadioStep);
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
  };

  const handleFormChange = (index) => {
    setCurrentForm(formIndividual);
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
            Pre Visualización
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
            currentForm[currentStep].map((item) => (
              <div key={item.id}>
                {(() => {
                  switch (item.tipo) {
                    case 'texto':
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
                              key={item.id}
                              label={item.pregunta}
                              variant="outlined"
                              fullWidth
                              required={item.requerido}
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
                            placeholder={item.pregunta}
                          />
                          <Divider />
                        </>
                      );
                    case 'radio':
                      return (
                        <RadioGroup
                          value={radioValues[item.id] || ''}
                          onChange={(e) =>
                            handleRadioChange(item.id, e.target.value)
                          }
                        >
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
                              control={<Radio />}
                              label={opcion}
                              value={opcion}
                            />
                          ))}
                        </RadioGroup>
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
                              required={item.requerido}
                              type="date"
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
                              required={item.requerido}
                              type="number"
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
            disabled
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
        </form>
      </Paper>
    </Container>
  );
};
