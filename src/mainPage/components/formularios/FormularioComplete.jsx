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
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para la carga

  const handleRadioChange = (id, value) => {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleResetForm = () => {
    setRadioValues({});
    setCurrentForm(formIndividual[Object.keys(formIndividual)[0]]);
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', radioValues);
  };

  const handleFormChange = (index) => {
    setCurrentForm(formIndividual[Object.keys(formIndividual)[index]]);
  };

  useEffect(() => {
    setIsLoading(true); // Indica que la carga está en progreso
    dispatch(getFormFromId({ telekinesis, form_id }));
  }, [form_id]);

  useEffect(() => {
    if (formIndividual) {
      setCurrentForm(formIndividual[Object.keys(formIndividual)[0]]);
      setIsLoading(false); // Indica que la carga ha finalizado
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
            Object.keys(formIndividual).map((key, index) => (
              <div key={index}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleFormChange(index)}
                  style={{ marginBottom: '10px' }}
                >
                  Formulario Step {index + 1}
                </Button>
              </div>
            ))}
          {!isLoading &&
            form_id &&
            currentForm &&
            currentForm.map((item) => (
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
            disabled
            style={{ marginTop: '20px' }}
          >
            Enviar Formulario
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
