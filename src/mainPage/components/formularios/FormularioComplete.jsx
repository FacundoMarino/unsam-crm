import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';

export const FormularioComplete = () => {
  const formIndividual = useSelector((state) => state.forms.individualForm);

  const [radioValues, setRadioValues] = useState({});
  const [formIndex, setFormIndex] = useState(0);
  const [formFields, setFormFields] = useState(
    formIndividual[Object.keys(formIndividual)[formIndex]],
  );

  const handleRadioChange = (id, value) => {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleResetForm = () => {
    setFormFields(formIndividual[Object.keys(formIndividual)[formIndex]]);
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formFields);
  };

  const handleFormChange = (index) => {
    setFormIndex(index);
    setFormFields(formIndividual[Object.keys(formIndividual)[index]]);
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form>
          <Typography marginBottom={2} marginTop={2} variant="h5">
            Pre Visualización
          </Typography>
          <Divider />

          {Object.keys(formIndividual).map((key, index) => (
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

          {formFields?.map((item) => (
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
                        <Typography marginBottom={2} marginTop={2} variant="h5">
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
                        <Typography marginBottom={2} marginTop={2} variant="h5">
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
